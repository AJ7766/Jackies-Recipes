import { SimplifiedRecipePropsNoUser } from "@/models/UserRecipe";

export default async function recipeValidation() {
    const formValidation = async ({ recipe }: { recipe: SimplifiedRecipePropsNoUser }) => {
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

    const ingredientListValidation = async (recipe: SimplifiedRecipePropsNoUser) =>{
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

    return { formValidation, ingredientListValidation }
};

const isValidImage = (image: string) => {
    const MAX_SIZE = 20 * 1024 * 1024;

    if (!image) {
        return 'Please upload a image';
    }

    const base64Data = image.split(';base64,').pop();
    if (!base64Data) {
        return 'Invalid Base64 data';
    }

    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length > MAX_SIZE) {
        return 'Image size exceeds 20MB';
    }
    return null;
};

const isValidRecipeName = (name: string) => {
    const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ\s-]+$/;

    if (name.length === 0) {
        const errorMsg = "Please enter a a Recipe name"
        return errorMsg;
    }
    if (!nameRegex.test(name)) {
        const errorMsg = "Recipe name can only contain letters"
        return errorMsg
    }
    if (name.length < 3) {
        const errorMsg = "Recipe name must be atleast 3 letters"
        return errorMsg;
    }
    return null
};

const isValidIngredients = (recipe: SimplifiedRecipePropsNoUser) => {
    for (const ingList of recipe.ingredients) {
        for (const ing of ingList.ingredients) {
            if (ing.ingredient.length < 1) {
                const errorMsg = "Please fill in an ingredient";
                return errorMsg;
            }
        }
    }
    return null;
};

const isValidServings = (servings?: number) => {
    if (servings !== undefined && typeof servings !== 'number') {
        const errorMsg = "Servings can only be numbers";
        return errorMsg;
    }
    return null;
};

const isValidInstructions = (recipe: SimplifiedRecipePropsNoUser) => {
    if (!recipe.instructions || recipe.instructions.length === 0) {
        const errorMsg = "Please type your instructions";
        return errorMsg;
    }
    return null;
};