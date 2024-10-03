import { connectDB } from "@/config/database";
import { UserModel } from "@/models/UserModel"; // Assuming this is the User model
import { RecipeModel, RecipeProps } from "@/models/UserRecipe"; // Assuming this is the new Recipe model
import mongoose from "mongoose";

export async function migrateRecipes() {
    try {
        await connectDB(); // Connect to the database

        // Fetch all users who have recipes
        const users = await UserModel.find({ recipes: { $exists: true, $ne: [] } }).lean();

        for (const user of users) {
            const recipes= user.recipes; 

            const existingRecipes = await RecipeModel.find({ _id: { $in: recipes } }).lean();
            const existingRecipeIds = existingRecipes.map(recipe => recipe._id.toString()); // Convert to string for easy comparison

            // Filter out recipes that already exist
            const recipesToMigrate = recipes.filter(recipeId => !existingRecipeIds.includes(recipeId.toString()));

            // If there are no recipes to migrate, skip this user
            if (recipesToMigrate.length === 0) {
                console.log(`Skipping user ${user._id}, all recipes already exist.`);
                continue;
            }
            
            const newRecipeIds: mongoose.Types.ObjectId[] = []; 

            for (const recipe of recipes) {
                const newRecipe = await RecipeModel.create({
                    ...recipe,
                    user: user._id,
                });
                newRecipeIds.push(newRecipe._id); // Store the new recipe ID
            }
            console.log("New recipes:",newRecipeIds);

            // Update the user document to reflect the new recipe IDs
            await UserModel.updateOne(
                { _id: user._id },
                { 
                    $set: { recipes: newRecipeIds } // Replace recipes with new recipe IDs
                }
            );
        }

        console.log('Migration complete. All users have been updated.');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}