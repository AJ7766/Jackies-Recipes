import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddRecipeForm(){

    type RecipeProps = {
        title: string;
        ingredients?: IngredientList[];
        servings?: number | string;
        macros?: MacroNutrientsProps;
        instructions?: InstructionProps[];
    }

    type MacroNutrientsProps = {
        carbs?: number | string,
        protein?: number | string,
        fat?: number | string,
        calories?: number | string
    }

    type IngredientList = {
        component?: ComponentProps[];
        ingredients: IngredientProps[];
    }

    type ComponentProps = {
        id: string;
        component: string;
    }

    type IngredientProps = {
        id: string;
        ingredient: string;
        amount: number | string;
        unit: string;
    }

    type InstructionProps = {
        id: string;
        instruction: string;
    }

    const [recipe, setRecipe] = useState<RecipeProps>({
        title: '',
        ingredients: [{
            component: [{
                id: uuidv4(),
                component: '',
            }],
            ingredients: [{
                id: uuidv4(),
                ingredient: '',
                amount: '',
                unit:'',
            }]
        }],
        servings: '',
        macros: {
            carbs: '',
            protein: '',
            fat: '',
        },
        instructions: [{
            id: uuidv4(),
            instruction: '',
        }],
    });

    const [isChecked, setIsChecked] = useState(false);
    const [carbohydrates, setCarbohydrates] = useState<number>();
    const [protein, setProtein] = useState<number>();
    const [fat, setFat] = useState<number>();
    const [calories, setCalories] = useState<number>();
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<number>();
    const [servings, setServings] = useState<number>();

    useEffect(() => {
        if (carbohydrates !== undefined && protein !== undefined && fat !== undefined) {
            const totalCalories = (carbohydrates * 4) + (protein * 4) + (fat * 9);
            setCaloriesPlaceholder(totalCalories);
        } else {
            setCaloriesPlaceholder(undefined);
        }
        if (carbohydrates === 0) {
            setCarbohydrates(undefined);
        }
    }, [carbohydrates, protein, fat]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleTitleChange = (newValue: string) => {
        setRecipe(prevRecipe => ({ ...prevRecipe, title: newValue }));
    };

    const handleComponentChange = (indexId: number, compId: string, newValue: string) => {
        const updatedIngredients = recipe.ingredients?.map((ingList, index) => {
            if (index === indexId) {
                const updatedComponents = ingList.component?.map(comp => {
                    if (comp.id === compId) {
                        return { ...comp, component: newValue };
                    }
                    return comp;
                }) || [];
                
                return {
                    ...ingList,
                    component: updatedComponents
                };
            }
            return ingList;
        }) || [];
    
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients
        }));
        console.log(recipe);
    };

    const handleAmountChange = (id: string, newValue: number) => {
        const updatedIngredients = recipe.ingredients?.map(ingList => {
            const updatedIngredientList = ingList.ingredients.map(ing=>{
                if (ing.id === id) { 
                    return { ...ing, amount: newValue };
                }
                return ing;
            });
            return { ...ingList, ingredients: updatedIngredientList };
        });

        setRecipe(prevRecipe => ({
            ...prevRecipe, 
            ingredients: updatedIngredients }));
    };

    const maxFiveInputs = (value: number) => {
        if (value > 999) {
            return 999;
        }
        return value;
    };

    const handleUnitChange = (id: string, newValue: string) => {
        const updatedIngredients = recipe.ingredients?.map(ingList => {
            const updatedIngredientList = ingList.ingredients.map(ing => {
                if (ing.id === id) {
                    return { ...ing, unit: newValue };
                }
                return ing;
            });
                return { ...ingList, ingredients: updatedIngredientList };
        });
            setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const handleIngredientChange = (id: string, newValue: string) => {
        const updatedIngredients = recipe.ingredients?.map(ingList => {
            const updatedIngredientList = ingList.ingredients.map(ing => {
                if (ing.id === id) {
                    return { ...ing, ingredient: newValue };
                }
                return ing;
            });
            return { ...ingList, ingredients: updatedIngredientList };
        });
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const addComponent = (index: number) => {
        const newComponent: ComponentProps = {
            id: uuidv4(),
            component: '',
        };
    
        const updatedIngredients = recipe.ingredients?.map((ingList, idx) => {
            if (idx === index) {
                return {
                    ...ingList,
                    component: [...(ingList.component || []), newComponent]
                };
            }
            return ingList;
        });
    
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const addIngredient = (index: number) => {
        const newIngredient: IngredientProps = {
            id: uuidv4(),
            amount: '',
            unit: '',
            ingredient: ''
        };
        //looping through ingredientlist, if index is the same index as the list, return
        //current inglist, but change ingr
        const updatedIngredients = recipe.ingredients?.map((ingList, idx) => {
            if (idx === index) {
                return {
                    ...ingList,
                    ingredients: [...ingList.ingredients, newIngredient]
                };
            }
            return ingList;
        });
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const removeComponent = (listIndex: number, componentToRemove: string) => {
        // Ensure the ingredient list exists
        const updatedIngredients = recipe.ingredients?.map((ingList, idx) => {
            if (idx === listIndex) {
                // If `component` exists and it's a string, process it
                if (ingList.component) {
                    // Split the component string into an array
                    const components = ingList.component.split(', ');
                    // Filter out the component to be removed
                    const updatedComponents = components.filter(comp => comp !== componentToRemove);
                    // Join the array back into a string
                    return {
                        ...ingList,
                        component: updatedComponents.join(', ')
                    };
                }
            }
            return ingList;
        });
    
        // Update the recipe state
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const removeIngredient = (id: string) => {
        const updatedIngredients = recipe.ingredients?.map(ingList => {
            return {
                ...ingList,
                ingredients: ingList.ingredients?.filter(ing => ing.id !== id) || []
            };
        });
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ingredients: updatedIngredients || []
        }));
    };

    const maxTwoInputs = (value: number) => {
        if (value > 99) {
            return 99;
        }
        return value;
    };

    const toggleSlider = () => {
        setIsChecked(prevIsChecked => !prevIsChecked);
    };

    const handleInstructionChange = (id: string, newValue: string) => {
        const updatedInstructions = recipe.instructions?.map(ins => {
            if (ins.id === id) {
                return { ...ins, instruction: newValue };
            }
            return ins;
        });
        console.log(recipe)
        setRecipe(prevRecipe => ({ ...prevRecipe, instructions: updatedInstructions }));
    };

    const addInstruction = () => {
        const newInstruction: InstructionProps = {
            id: uuidv4(),
            instruction: ''
        };
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            instructions: [...(prevRecipe.instructions || []), newInstruction]
        }));
    };

    const removeInstruction = (id: string) => {
        const updatedInstructions = recipe.instructions?.filter(ins => ins.id !== id);
        setRecipe(prevRecipe => ({ ...prevRecipe, instructions: updatedInstructions }));
    };

  return (
        <>
            <form className="addRecipeForm" onSubmit={handleSubmit}>
                <h1 className="addRecipeTitle">Add Recipe</h1>
                <div className="recipeTitleContainer">
                    <label className="recipeLabel" htmlFor="recipe-name">Recipe Name:</label>
                    <input
                        type="text"
                        placeholder="Pasta Carbonara"
                        value={recipe.title || ''}
                        onChange={(e) => handleTitleChange(e.target.value)}
                    />
                </div>
                <div className="recipeSpace"></div>

                {recipe.ingredients && recipe.ingredients.map((ingredientList, index) => (
                <div className="recipe" key={index}>
                    {ingredientList.component?.map((comp, compIndex) =>
                    <div className="addComponentsContainer" key={compIndex}>
                    <label className="recipeLabel" htmlFor="ingredients-for">Component:</label>
                    <input
                        type="text"
                        placeholder="Topping, frosting, sauce..."
                        value={comp.component}
                        onChange={(e) => handleComponentChange(compIndex, comp.id, e.target.value)}
                    />
                    <span className="crossIcon"
                    onClick={() => removeComponent(comp.id)}
                    ></span>
                    </div>
                    )}
                    
                {ingredientList.ingredients.map((ing, ingIndex) => (
                <div className="addIngredientsContainer" key={ing.id}>
                    <label className="recipeLabel tabular-nums" htmlFor={`ingredient-${index}`}>{`Ingredient ${ingIndex + 1}`}</label>
                    <input
                        type="number"
                        className="amount"
                        placeholder="700"
                        value={ing.amount || ''}
                        onChange={(e) => {
                            const limitedValue = maxFiveInputs(+e.target.value);
                            handleAmountChange(ing.id, limitedValue);
                        }}
                    />
                    <input
                        type="text"
                        className="unit"
                        placeholder="g"
                        value={ing.unit}
                        onChange={(e) => handleUnitChange(ing.id, e.target.value)}
                    />
                    <input
                        type="text"
                        className="ingredient"
                        placeholder="Butter"
                        value={ing.ingredient}
                        onChange={(e) => handleIngredientChange(ing.id, e.target.value)}
                    />
                    <span
                        onClick={() => removeIngredient(ing.id)}
                        className="crossIcon"
                    ></span>
                </div>
                ))} 
                    <div className="addButtons">
                        <button type="button" onClick={() => addIngredient(index)}
                        >Add ingredient</button>
                        {(!ingredientList.component || ingredientList.component.length === 0) && 
                        <button type="button" onClick={() => addComponent(index)}>Add ingredient</button>
                        }
                    </div>
                    </div>
                ))}


                <div className="recipeSpace"></div>
                <div className="addServingsContainer">
                    <label className="recipeLabel" htmlFor="servings">Servings:</label>
                    <input
                        type="number"
                        value={servings || ""}
                        onChange={(e) => {
                            const limitedValue = maxTwoInputs(+e.target.value);
                            setServings(limitedValue);
                        }}
                    />
                </div>
                <div className="recipeSpace"></div>
                <div className="addRecipeSwitchContainer">
                    <h1>Nutritional values:</h1>
                    <label className="sliderContainer">
                        <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={toggleSlider}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                {isChecked && (
                    <>
                        <div className="addNutritionsContainer">
                            <label className="nutritionLabel" htmlFor="carbohydrates">Carbohydrates:<i className="opacity-50 absolute ml-1 text-xs">(g)</i></label>
                            <input
                                type="number"
                                placeholder=""
                                value={carbohydrates || ""}
                                onChange={(e) => setCarbohydrates(+e.target.value)}
                            />
                        </div>

                        <div className="addNutritionsContainer">
                            <label className="nutritionLabel" htmlFor="protein">Protein:<i className="opacity-50 absolute ml-1 text-xs">(g)</i></label>
                            <input
                                type="number"
                                placeholder=""
                                value={protein || ""}
                                onChange={(e) => setProtein(+e.target.value)}
                            />
                        </div>

                        <div className="addNutritionsContainer">
                            <label className="nutritionLabel" htmlFor="fat">Fat:<i className="opacity-50 absolute ml-1 text-xs">(g)</i></label>
                            <input
                                type="number"
                                placeholder=""
                                value={fat || ""}
                                onChange={(e) => setFat(+e.target.value)}
                            />
                        </div>

                        <div className="addNutritionsContainer">
                            <label className="recipeLabel" id="calories" htmlFor="calories">Calories:</label>
                            <input
                                type="number"
                                placeholder={caloriesPlaceholder?.toString()}
                                value={calories || ""}
                                onChange={(e) => setCalories(+e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="recipeSpace"></div>
                {recipe.instructions && recipe.instructions.map((ins, index) => (
                    <div className="addInstructionsContainer" key={ins.id}>
                        <label className="recipeLabel tabular-nums" htmlFor={`instruction-${index}`}>{`Instruction ${index + 1}`}</label>
                        <textarea
                            placeholder=""
                            rows={3}
                            value={ins.instruction}
                            onChange={(e) => handleInstructionChange(ins.id, e.target.value)}
                        />
                        <span
                            onClick={() => removeInstruction(ins.id)}
                            className="crossIcon"
                        ></span>
                    </div>
                ))}
                <div className="addButtons">
                    <button type="button" onClick={addInstruction}>Add instruction</button>
                </div>
            </form>
        </>
    );
}