import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import validationAddRecipeSchema from "./validationAddRecipeSchema";
import { RecipeProps } from "@/models/UserRecipe";
import { connectDB } from "@/config/database";

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
        const updateResult = await UserModel.updateOne(
            { _id: userId, 'recipes._id': recipe._id }, 
            { $set: { 'recipes.$': filteredRecipe } }
        );

        if (updateResult.modifiedCount === 0) {
            throw new Error('Recipe data not found');
        }

        const updatedUser = await UserModel.findOne({ _id: userId }).lean();
        return NextResponse.json({ success: true, message: "Success", updatedUser }, { status: 200 });

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