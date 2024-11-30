import { RecipeFormProps, RecipeProps } from "@/_models/RecipeModel";

export default async function ValidateRecipeForm(recipe: RecipeProps) {

    await isValidRecipeName(recipe.title || '');

    await isValidIngredients(recipe);

    await isValidServings(recipe.servings);

    await isValidInstructions(recipe);

    return null;
}

export const ingredientListValidation = async (recipe: RecipeProps) => {
    const filteredIngredientsList = recipe.ingredients.map((ingList) => {
        const filteredIngredients = ingList.ingredients?.filter(ing => ing.ingredient.length > 0 || []);
        const filteredComponents = ingList.component || undefined;
        return {
            ...ingList,
            ingredients: filteredIngredients,
            component: filteredComponents
        }
    }).filter(ingList => ingList.ingredients.length > 0 || ingList.component);

    const filteredInstructions = recipe.instructions?.filter(ins => ins.instruction.length > 0 || [])

    return {
        ...recipe,
        ingredients: filteredIngredientsList,
        instructions: filteredInstructions
    }
}

const isValidRecipeName = async (name: string) => {
    const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ\s-]+$/;

    if (name.length === 0)
        throw new Error("Please enter a Recipe name");

    if (!nameRegex.test(name))
        throw new Error("Recipe name can only contain letters");

    if (name.length < 3)
        throw new Error("Recipe name must be atleast 3 letters");

    return null
};

const isValidIngredients = async (recipe: RecipeFormProps) => {
    for (const ingList of recipe.ingredients) {
        for (const ing of ingList.ingredients) {
            if (ing.ingredient.length < 1)
                throw new Error("Please fill in an ingredient");
        }
    }
    return null;
};

const isValidServings = async (servings?: number | string) => {
    if (typeof servings !== 'number')
        throw new Error("Servings can only be numbers");

    return null;
};

const isValidInstructions = async (recipe: RecipeFormProps) => {
    if (!recipe.instructions || recipe.instructions.length === 0)
        throw new Error("Please type your instructions");
    return null;
};