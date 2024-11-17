import { RecipeFormProps, RecipeProps } from "@/_models/RecipeModel";

export const formValidation = async (recipe: RecipeProps) => {
    let errorMessage: string | null;

    errorMessage = isValidImage(recipe.image || '');
    if (errorMessage) return errorMessage;

    errorMessage = isValidRecipeName(recipe.title || '');
    if (errorMessage) return errorMessage;

    errorMessage = isValidIngredients(recipe);
    if (errorMessage) return errorMessage;

    errorMessage = isValidServings(recipe.servings);
    if (errorMessage) return errorMessage;

    errorMessage = isValidInstructions(recipe);
    if (errorMessage) return errorMessage;

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

const isValidImage = (image: string) => {
    const MAX_SIZE = 20 * 1024 * 1024;

    if (!image) return 'Please upload a image';

    const base64Data = image.split(';base64,').pop();
    if (!base64Data) return 'Invalid Base64 data';

    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length > MAX_SIZE) return 'Image size exceeds 20MB';

    return null;
};

const isValidRecipeName = (name: string) => {
    const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ\s-]+$/;

    if (name.length === 0) return "Please enter a a Recipe name";

    if (!nameRegex.test(name)) return "Recipe name can only contain letters";

    if (name.length < 3) return "Recipe name must be atleast 3 letters";

    return null
};

const isValidIngredients = (recipe: RecipeFormProps) => {
    for (const ingList of recipe.ingredients) {
        for (const ing of ingList.ingredients) {
            if (ing.ingredient.length < 1) return "Please fill in an ingredient";
        }
    }
    return null;
};

const isValidServings = (servings?: number | string) => {

    if (typeof servings !== 'number') return "Servings can only be numbers";

    return null;
};

const isValidInstructions = (recipe: RecipeFormProps) => {
    if (!recipe.instructions || recipe.instructions.length === 0) return "Please type your instructions";
    return null;
};