import { IngredientListProps, IngredientProps, InstructionProps, SimplifiedRecipePropsNoUser } from "@/models/UserRecipe";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Resizer from "react-image-file-resizer";

export function recipeFormActions(recipeEdit?: SimplifiedRecipePropsNoUser) {
    const [imagePreview, setImagePreview] = useState<string>();
    const [recipe, setRecipe] = useState<SimplifiedRecipePropsNoUser>(
        recipeEdit ?? {
            title: imagePreview || "",
            image: "",
            ingredients: [
                {
                    component: "",
                    ingredients: [
                        {
                            id: uuidv4(),
                            ingredient: "",
                            amount: undefined,
                            unit: "",
                        },
                    ],
                },
            ],
            servings: undefined,
            macros: {
                carbs: undefined,
                protein: undefined,
                fat: undefined,
            },
            instructions: [
                {
                    id: uuidv4(),
                    instruction: "",
                },
            ],
        }
    );
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<string>();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        calculateCalories();
    }, [recipe?.macros]);

    const calculateCalories = () => {
        const calsFromCarbs = recipe?.macros?.carbs
            ? Number(recipe?.macros.carbs) * 4
            : 0;
        const calsFromProtein = recipe?.macros?.protein
            ? Number(recipe?.macros.protein) * 4
            : 0;
        const calsFromFat = recipe?.macros?.fat ? Number(recipe?.macros.fat) * 9 : 0;

        const totalCals = calsFromCarbs + calsFromProtein + calsFromFat;
        setCaloriesPlaceholder(totalCals > 0 ? totalCals.toString() : undefined);
    };

    const handleImageChange = () => {
        document.getElementById("imageInput")?.click();
    };

    const handleRecipeImageChange = (img: string) => {
        setRecipe((prevRecipe) => ({ ...prevRecipe, image: img }));
        setImagePreview(img);
    };

    const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
            const maxSize = 20 * 1024 * 1024;

            if (!allowedMimeTypes.includes(file.type)) {
                alert("Please upload an image file (JPEG, PNG, WEBP).");
                return;
            }

            if (file.size > maxSize) {
                alert("File size exceeds 20 MB.");
                return;
            }
            try {
                Resizer.imageFileResizer(
                    file,
                    1280, // max width
                    850, // max height
                    "JPEG", // format
                    90, // quality
                    0, // rotation
                    (uri) => {
                        if (typeof uri === "string") {
                            handleRecipeImageChange(uri);
                        } else {
                            console.error("Unexpected type:", uri);
                        }
                    },
                    "base64"
                );
            } catch (error) {
                console.error("Error resizing image:", error);
            }
        }
    };

    const handleTitleChange = (value: string) => {
        setRecipe((prevRecipe) => ({ ...prevRecipe, title: value }));
    };

    const handleAmountChange = (
        id: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const amount = Math.max(0, Math.min(Number(e.target.value), 99999));
        updateIngredientList(id, { amount: amount });
    };

    const handleUnitChange = (id: string, value: string) => {
        updateIngredientList(id, { unit: value });
    };

    const handleIngredientChange = (id: string, newValue: string) => {
        updateIngredientList(id, { ingredient: newValue });
    };

    const updateIngredientList = (
        id: string,
        updatedFields: Partial<IngredientProps>
    ) => {
        const updatedIngredients = recipe.ingredients.map((ingList) => ({
            ...ingList,
            ingredients: ingList.ingredients.map((ing) =>
                ing.id === id ? { ...ing, ...updatedFields } : ing
            ),
        }));

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: updatedIngredients,
        }));
    };

    const handleComponentChange = (index: number, value: string) => {
        setRecipe((prevRecipe) => {
            const updatedIngredient = [...prevRecipe.ingredients];

            updatedIngredient[index] = {
                ...updatedIngredient[index],
                component: value ?? '',
            }
            return { ...prevRecipe, ingredients: updatedIngredient }
        });
    }

    const addComponent = (index: number) => {
        setRecipe((prevRecipe) => {
            const updatedIngredient = [...prevRecipe.ingredients];

            updatedIngredient[index] = {
                ...updatedIngredient[index],
                component: ''
            }

            return { ...prevRecipe, ingredients: updatedIngredient }
        });
    };

    const removeComponent = (index: number) => {
        setRecipe((prevRecipe) => {
            const updatedIngredients = [...prevRecipe.ingredients];

            updatedIngredients[index] = {
                ...updatedIngredients[index],
                component: undefined
            };

            const filteredIngredients =
                updatedIngredients?.filter((ingList) =>
                    ingList.ingredients.length > 0 || ingList.component
                ) || [];

            return { ...prevRecipe, ingredients: filteredIngredients };
        });
    };

    const addIngredient = (index: number) => {
        const newIngredient: IngredientProps = {
            id: uuidv4(),
            amount: undefined,
            unit: "",
            ingredient: "",
        };

        setRecipe((prevRecipe) => {
            const updatedIngredients = [...prevRecipe.ingredients];

            updatedIngredients[index] = {
                ...updatedIngredients[index],
                ingredients: [...updatedIngredients[index].ingredients, newIngredient],
            };

            return { ...prevRecipe, ingredients: updatedIngredients };
        });
    };

    const removeIngredient = (id: string) => {
        const updatedIngredients = recipe.ingredients?.map((ingList) => {
            return {
                ...ingList,
                ingredients: ingList.ingredients?.filter((ing) => ing.id !== id) || [],
            };
        });

        const filteredIngredients =
            updatedIngredients?.filter((ingList) =>
                ingList.ingredients.length > 0 || ingList.component
            ) || [];

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: filteredIngredients,
        }));
    };

    const addNewComponent = () => {
        const newIngredientList: IngredientListProps = {
            component: '',
            ingredients: [
                {
                    id: uuidv4(),
                    ingredient: "",
                    amount: undefined,
                    unit: "",
                },
            ],
        };
        const updatedIngredients = [
            ...(recipe.ingredients || []),
            newIngredientList,
        ];
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: updatedIngredients,
        }));
    };

    const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const servings = Math.max(0, Math.min(Number(e.target.value), 99));
        setRecipe((prevRecipe) => ({ ...prevRecipe, servings }));
    };

    const toggleSlider = () => {
        setRecipe((prevList) => ({
            ...prevList,
            macros: {
                carbs: 0,
                protein: 0,
                fat: 0,
                calories: 0,
            },
        }));
        setIsChecked((prevIsChecked) => !prevIsChecked);
    };

    const handleMacroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const macroValue = Math.max(0, Math.min(Number(value), 9999));

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            macros: { ...prevRecipe.macros, [name]: macroValue },
        }));
    };

    const handleInstructionChange = (id: string, value: string) => {
        const updatedInstructions = recipe.instructions?.map((ins) =>
            ins.id === id ? { ...ins, instruction: value } : ins
        );

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: updatedInstructions,
        }));
    };

    const addInstruction = () => {
        const newInstruction: InstructionProps = { id: uuidv4(), instruction: "" };

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: [...(prevRecipe.instructions || []), newInstruction],
        }));
    };

    const removeInstruction = (id: string) => {
        const selectedInstruction = recipe.instructions?.filter((ins) => ins.id !== id);

        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            instructions: selectedInstruction,
        }));
    };

    return { recipe, isChecked, caloriesPlaceholder, imagePreview, handleImageChange, imageChange, handleTitleChange, handleAmountChange, handleUnitChange, handleIngredientChange, handleComponentChange, addComponent, removeComponent, addIngredient, removeIngredient, addNewComponent, handleServingsChange, toggleSlider, handleMacroChange, handleInstructionChange, addInstruction, removeInstruction }
}