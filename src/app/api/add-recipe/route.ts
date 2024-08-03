import { UserModel } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { recipe, userId } = await request.json();
        console.log("Recipe:", recipe);
        console.log("User ID:", userId);

        if (!recipe || !userId) {
            return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
        }

        const updateResult = await UserModel.updateOne(
            { _id: userId },
            { $push: { recipes: recipe } }
        );

        if (updateResult.modifiedCount === 0) {
            throw new Error('User not found or data unchanged');
        }

        const updatedUser = await UserModel.findOne({ _id: userId });

        console.log("Recipes: ", updatedUser?.recipes)
        return NextResponse.json({ success: true, message: "Success", updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}