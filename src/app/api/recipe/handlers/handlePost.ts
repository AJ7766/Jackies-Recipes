import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { RecipeModel, RecipeProps } from "@/models/UserRecipe";
import { connectDB } from "@/config/database";
import cache from "@/config/cache";
import recipeValidation from "../validations/recipeValidation";

export async function handlePost(request: NextRequest) {
    const { formValidation, ingredientListValidation } = await recipeValidation();
    try {
        const { recipe, userId } = await request.json();

        if (!recipe || !userId) {
            return NextResponse.json({ success: false, message: "No user or recipe found" }, { status: 400 });
        }

        const validationResponse = await formValidation({ recipe });

        if (typeof validationResponse === 'string') {
            return NextResponse.json({ success: false, message: validationResponse }, { status: 400 });
        }

        const filteredRecipe = await ingredientListValidation(recipe);

        await connectDB();

        const user = await UserModel.findOne({ _id: userId });
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