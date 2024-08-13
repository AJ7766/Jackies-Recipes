import { RecipeProps } from "@/models/UserRecipe";

export default async function validationAddRecipeSchema({recipe}:{recipe: RecipeProps}){

    let errorMessage = "";

    console.log(recipe)
    const imageError = isValidImage(recipe.image || '');
    if (imageError) {
        errorMessage = imageError;
        return errorMessage
    }

    const recipeNameError = isValidRecipeName(recipe.title || '');
    if (recipeNameError) {
        errorMessage = recipeNameError;
        return errorMessage
    }

    const recipeIngredientsError = isValidIngredients(recipe)
    if(recipeIngredientsError){
        errorMessage = recipeIngredientsError;
        return errorMessage;
    }

    const servingsError = isValidServings(recipe?.servings)
    if(servingsError){
        errorMessage = servingsError;
        return errorMessage;
    }

    const instructionsError = isValidInstructions(recipe)
    if(instructionsError){
        errorMessage = instructionsError;
        return errorMessage;
    }

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
    
    if(name.length === 0){
        const errorMsg = "Please enter a a Recipe name"
        return errorMsg;
    }
    if(!nameRegex.test(name)){
      const errorMsg = "Recipe name can only contain letters"
      return errorMsg
    }
    if(name.length < 3){
      const errorMsg = "Recipe name must be atleast 3 letters"
      return errorMsg;
    }
    return null
};

    const isValidIngredients = (recipe: RecipeProps) => {
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
        if (servings !== undefined && typeof servings !== 'number'){
            const errorMsg = "Servings can only be numbers";
            return errorMsg;
        }
        return null;
    };

    const isValidInstructions = (recipe: RecipeProps) => {
        if (!recipe.instructions || recipe.instructions.length === 0) {
            const errorMsg = "Please type your instructions";
            return errorMsg;
        }
        return null;
    };