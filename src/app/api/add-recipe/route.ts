import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import validationAddRecipeSchema from "./validationAddRecipeSchema";
import { RecipeModel, RecipeProps } from "@/models/UserRecipe";
import { connectDB } from "@/config/database";
import cache from "@/config/cache";

export async function POST(request: NextRequest) {
    try {
        const { recipe, userId } = await request.json();

        if (!recipe || !userId) {
            return NextResponse.json({ success: false, message: "No user or recipe found" }, { status: 400 });
        }

        const validationResponse = await validationAddRecipeSchema({recipe});

        if (typeof validationResponse === 'string') {
            return NextResponse.json({ success: false, message: validationResponse }, { status: 400 });
        }

        const filteredRecipe = await secondValidation(recipe);

        await connectDB();

        const user = await UserModel.findOne({_id: userId});
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const newRecipe = await RecipeModel.create({
            ...filteredRecipe,
            user: userId,
        });

        await UserModel.updateOne(
            { _id: userId },
            { $addToSet: { recipes: newRecipe._id } }
        );

        cache.del(user.username);


        cache.del(user.username);
        
        return NextResponse.json({ success: true, message: "Success", user }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}

async function secondValidation(recipe: RecipeProps){
    const filteredIngredientsList = recipe.ingredients.map((ingList)=>{
        const filteredIngredients = ingList.ingredients?.filter(ing => ing.ingredient.length > 0 || [])
        const filteredComponents = ingList.component?.filter(ing => ing.component.length > 0 || [])
        return{
            ...ingList,
            ingredients: filteredIngredients,
            component: filteredComponents
        }
    }).filter(ingList => ingList.ingredients.length > 0 || (ingList.component && ingList.component.length > 0));

    const filteredInstructions = recipe.instructions?.filter(ins => ins.instruction.length > 0 || [])

    return{
        ...recipe,
        ingredients: filteredIngredientsList,
        instructions: filteredInstructions
    }
}