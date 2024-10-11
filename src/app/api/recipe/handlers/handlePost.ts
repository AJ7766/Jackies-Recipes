import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { RecipeModel, SimplifiedRecipePropsNoUser } from "@/models/UserRecipe";
import { connectDB } from "@/config/database";
import cache from "@/config/cache";
import recipeValidation from "../validations/recipeValidation";
import { verifyToken } from "@/config/jwt";

export async function handlePost(request: NextRequest) {
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

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const newRecipe = await RecipeModel.create({
            ...filteredRecipe,
            user: userId,
        });

        const updateUserResult = await UserModel.updateOne(
            { _id: userId },
            { $addToSet: { recipes: newRecipe._id } }
        );

        if (updateUserResult.modifiedCount !== 1) {
            return NextResponse.json({ message: 'Failed to update user with the new recipe' }, { status: 404 });
        }

        cache.del(user.username);

        return NextResponse.json({ success: true, message: "Success" }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}