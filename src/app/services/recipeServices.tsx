import { RecipeFormProps } from "@/_types/RecipeTypes";

export const deleteIngredientComponent = (
    prevRecipe: RecipeFormProps,
    data_set: string,
    ing_list_index: number,
    ing_index?: number,
) => {
    return prevRecipe.ingredients.map(
        (ing_list, list_index) =>
            (list_index === ing_list_index)
                ? {
                    ...ing_list,
                    ingredients: (data_set === "ingredient" && ing_index !== undefined) ?
                        ing_list.ingredients.filter(
                            (_, index) => index !== ing_index
                        ) : ing_list.ingredients,
                    component: data_set === "component" ? undefined : ing_list.component,
                }
                : ing_list);
}

export const deleteInstruction = (
    prevRecipe: RecipeFormProps,
    ins_index: number,
) => prevRecipe.instructions?.filter((_, index) => index !== ins_index) ?? [];

export const updateIngredientComponent = (
    prevRecipe: RecipeFormProps,
    name: string,
    value: string,
    data_set: string,
    ing_list_index: number,
    ing_index?: number,
) => {
    const shallow_ing_list = [...prevRecipe.ingredients];

    if (data_set === "ingredients" && ing_index !== undefined) {
        const updated_ing = {
            ...shallow_ing_list[ing_list_index].ingredients[ing_index],
            [name]: value,
        };

        shallow_ing_list[ing_list_index].ingredients[ing_index] = updated_ing;
    }
    if (data_set === "component") {
        const updated_ing = {
            ...shallow_ing_list[ing_list_index],
            [name]: value,
        };
        shallow_ing_list[ing_list_index] = updated_ing;
    }

    return shallow_ing_list || [];
}

export const updateInstruction = (
    prevRecipe: RecipeFormProps,
    name: string,
    value: string,
    ins_index: number
) => {
    const shallow_ins_list = [...prevRecipe.instructions ?? []];
    const updated_ins = { ...shallow_ins_list[ins_index], [name]: value };

    shallow_ins_list[ins_index] = updated_ins;

    return shallow_ins_list
}

export const createIngredientComponent = (
    prevRecipe: RecipeFormProps,
    data_set: string,
    ing_list_index: number,
) => {

    const shallow_ing_list = [...prevRecipe.ingredients]

    if (ing_list_index !== undefined) {
        shallow_ing_list[ing_list_index] = {
            ...shallow_ing_list[ing_list_index],
            ingredients: (data_set === "ingredient")
                ? [...shallow_ing_list[ing_list_index].ingredients, {
                    amount: undefined,
                    unit: "",
                    ingredient: ""
                }]
                : shallow_ing_list[ing_list_index].ingredients,
            component: (data_set === "component") ? ""
                : shallow_ing_list[ing_list_index].component,
        }
    }
    return shallow_ing_list;
}

export const createField = (
    prevRecipe: RecipeFormProps,
) => {
    return [...prevRecipe.ingredients || [], {
        component: "",
        ingredients: [
            {
                ingredient: "",
                amount: undefined,
                unit: "",
            },
        ],
    }]
}

export const createInstruction = (
    prevRecipe: RecipeFormProps,
) => {
    return [...prevRecipe.instructions || [], { instruction: "" }]

}

export const handleImageClick = () => {
    document.getElementById("imageInput")?.click();
};

export const calculateCalories = (
    recipe: RecipeFormProps,
) => {
    const calsFromCarbs = recipe?.macros?.carbs
        ? Number(recipe?.macros.carbs) * 4
        : 0;
    const calsFromProtein = recipe?.macros?.protein
        ? Number(recipe?.macros.protein) * 4
        : 0;
    const calsFromFat = recipe?.macros?.fat
        ? Number(recipe?.macros.fat) * 9
        : 0;

    return calsFromCarbs + calsFromProtein + calsFromFat > 0 ? (calsFromCarbs + calsFromProtein + calsFromFat).toString() : undefined;
}