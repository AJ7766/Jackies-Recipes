import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { RecipeModel, RecipeProps, SimplifiedRecipePropsNoUser } from "@/models/UserRecipe";
import { connectDB } from "@/config/database";
import cache from "@/config/cache";
import recipeValidation from "../validations/recipeValidation";
import { verifyToken } from "@/config/jwt";

export async function handlePut(request: NextRequest) {
    const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { formValidation, ingredientListValidation } = await recipeValidation();

    try {
        const { recipe }: { recipe: SimplifiedRecipePropsNoUser } = await request.json();
        const token = authHeader.split(' ')[1];
        const decoded = await verifyToken(token);
        const userId = decoded.id;

        if (!recipe || !userId) {
            return NextResponse.json({ success: false, message: "No user or recipe found" }, { status: 400 });
        }

        const validationResponse = await formValidation({ recipe });

        if (typeof validationResponse === 'string') {
            return NextResponse.json({ success: false, message: validationResponse }, { status: 400 });
        }

        const filteredRecipe = await ingredientListValidation(recipe);

        await connectDB();
        
        const updateResult = await RecipeModel.updateOne(
            { _id: recipe._id },
            { $set: filteredRecipe },
            { new: true }
        );

        if (updateResult.modifiedCount === 0) {
            throw new Error('Recipe data not found');
        }

        const updatedUser = await UserModel.findOne({ _id: userId }).lean();

        if (updatedUser?.username) {
            cache.del(updatedUser.username);
        }

        return NextResponse.json({ success: true, message: "Success" }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}