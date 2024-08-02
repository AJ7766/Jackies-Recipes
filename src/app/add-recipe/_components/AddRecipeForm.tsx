import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddRecipeForm(){

    type RecipeProps = {
        component?: ComponentProps[];
        ingredient?: IngredientProps[];
        servings?: number | string;
        macros?: MacroNutrientsProps[];
        instructions?: InstructionProps[];
    }

    type MacroNutrientsProps = {
        carbs: number | string,
        protein: number | string,
        fat: number |string
    }

    type ComponentProps = {
        id: string;
        component: string;
    }

    type IngredientProps = {
        id: string;
        amount: number | string;
        unit: string;
        ingredient: string;
    }

    type InstructionProps = {
        id: string;
        instruction: string;
    }

    const [recipeName, setRecipeName] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [carbohydrates, setCarbohydrates] = useState<number>();
    const [protein, setProtein] = useState<number>();
    const [fat, setFat] = useState<number>();
    const [calories, setCalories] = useState<number>();
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<number>();
    const [servings, setServings] = useState<number>();
    const [recipe, setRecipe] = useState<RecipeProps[]>([
        {
        component: [{
            id: uuidv4(),
            component: ''
        }],
        ingredient: [{
            id: uuidv4(),
            amount: '',
            unit: '',
            ingredient: ''
        }],
        servings: '',
        macros: [{
            carbs: '',
            protein: '',
            fat: '',
        }],
        instructions: [{
            id: uuidv4(),
            instruction: '',
        }],
        }
    ]);

    useEffect(() => {
        if (carbohydrates !== undefined && protein !== undefined && fat !== undefined) {
        const totalCalories = (carbohydrates * 4) + (protein * 4) + (fat * 9);
        setCaloriesPlaceholder(totalCalories);
        }else {
            setCaloriesPlaceholder(undefined);
        }
        if(carbohydrates === 0){
            setCarbohydrates(undefined)
        }
    }, [carbohydrates, protein, fat]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const toggleSlider = () => {
        setIsChecked(prevIsChecked => !prevIsChecked);
    };

    const handleComponentChange = (itemIndex: number, id: string, newValue: string) => {
        const updatedIngredientList = recipe.map((item, index) => {
            if (index === itemIndex) {
                const updatedComponents = item.component && item.component.map(comp => {
                    if (comp.id === id) {
                        return { ...comp, component: newValue };
                    }
                    return comp;
                });
                return { ...item, component: updatedComponents };
            }
            return item;
        });
        console.log(updatedIngredientList);
        setRecipe(updatedIngredientList);
    };

    const handleAmountChange = (itemIndex: number, id: string, newValue: number) => {
        const updatedIngredientList = recipe.map((item, index) => {
            if (index ===itemIndex){
                const updatedAmount = item.ingredient && item.ingredient.map(ing => {
                    if(ing.id === id){
                        return {...ing, amount: newValue};
                    }
                    return ing;
                });
                return {...item, ingredient: updatedAmount}
            }
            return item;
        });
        setRecipe(updatedIngredientList);
    };
    const maxFiveInputs = (value: number) => {
        if(value > 999){
            return 999;
        }
        else{
            return value;
        }
    }
    
    const handleUnitChange = (itemIndex: number, id: string, newValue: string) => {
        const updatedIngredientList = recipe.map((item, index) => {
            if (index ===itemIndex){
                const updatedUnit = item.ingredient && item.ingredient.map(ing => {
                    if(ing.id === id){
                        return {...ing, unit: newValue};
                    }
                    return ing;
                });
                return {...item, ingredient: updatedUnit}
            }
            return item;
        });
        setRecipe(updatedIngredientList);
    };

    const handleIngredientChange = (itemIndex: number, id: string, newValue: string) => {
        const updatedIngredientList = recipe.map((item, index) => {
            if (index ===itemIndex){
                const updatedIngredient = item.ingredient && item.ingredient.map(ing => {
                    if(ing.id === id){
                        return {...ing, ingredient: newValue};
                    }
                    return ing;
                });
                return {...item, ingredient: updatedIngredient}
            }
            return item;
        });
        console.log(recipe)
        setRecipe(updatedIngredientList);
    };

    const addComponent = (index: number) => {
        const newComponent: ComponentProps = {
            id: uuidv4(),
            component: ''
        };

        setRecipe(prevList => {
            const updatedList = [...prevList];
            if (index >= 0 && index < updatedList.length) {
                updatedList[index] = {
                    ...updatedList[index],
                    component: [...(updatedList[index].component || []), newComponent]
                };
            }
    
            return updatedList;
        });
    }

    const addIngredient = (index: number) => {
        const newIngredient: IngredientProps = {
            id: uuidv4(),
            amount: '',
            unit: '',
            ingredient: ''
        };
    
        setRecipe(prevList => {
            const updatedList = [...prevList];
            if (index >= 0 && index < updatedList.length) {
                updatedList[index] = {
                    ...updatedList[index],
                    ingredient: [...(updatedList[index].ingredient || []), newIngredient]
                };
            }
    
            return updatedList;
        });
    };

    const addNewComponent = () => {
        const newRecipe: RecipeProps = {
            component: [{
                id: uuidv4(),
                component: ''
            }],
            ingredient: [{
                id: uuidv4(),
                amount: '',
                unit: '',
                ingredient: ''
            }],
            servings: '',
            macros: [{
                carbs: '',
                protein: '',
                fat: '',
            }],
            instructions: [{
                id: uuidv4(),
                instruction: '',
            }],
        };
        setRecipe([...recipe, newRecipe]);
    }

    const removeComponent = (id: string) => {
        setRecipe(prevList =>
            prevList.map(item => ({
                ...item,
                component: (item.component || []).filter(comp => comp.id !== id),
            }))
            .filter(item => (item.component && item.component.length > 0) || (item.ingredient && item.ingredient.length > 0))

        );
        console.log(recipe)
    };
 
    const removeIngredient = (id: string) => {
        setRecipe(prevList =>
            prevList.map(item => ({
                ...item,
                ingredient: (item.ingredient || []).filter(ing => ing.id !== id)
            }))
            .filter(item => (item.component && item.component.length > 0) || (item.ingredient && item.ingredient.length > 0))
        );
        console.log(recipe)
    };

    const maxTwoInputs = (value: number) => {
        if(value > 99){
            return 99;
        }
        else{
            return value;
        }
    }

    const handleInstructionChange = (itemIndex: number, id: string, newValue: string) => {
        const updatedInstructionsList = recipe.map((item, index) => {
            if (index ===itemIndex){
                const updatedInstruction = item.instructions && item.instructions.map(ins => {
                    if(ins.id === id){
                        return {...ins, instruction: newValue};
                    }
                    return ins;
                });
                return {...item, instructions: updatedInstruction}
            }
            return item;
        });
        setRecipe(updatedInstructionsList);
    };
    
    const addInstruction = (index: number) => {
        const newInstruction: InstructionProps = {
            id: uuidv4(),
            instruction: ''
        };
    
        setRecipe(prevList => {
            const updatedList = [...prevList];
            if (index >= 0 && index < updatedList.length) {
                updatedList[index] = {
                    ...updatedList[index],
                    instructions: [...(updatedList[index].instructions || []), newInstruction]
                };
            }
            return updatedList;
        });
        console.log(recipe)
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
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                    />
                </div>
                <div className="recipeSpace"></div>
                {recipe.map((item, index) => (
                <div className="recipe" key={index}>
                            {item.component && item.component.map((comp) =>(
                                <div className="addComponentsContainer" key={comp?.id}>
                               <label className="recipeLabel" htmlFor="ingredients-for">Component:</label>
                               <input 
                                   type="text"
                                   placeholder="Topping, frosting, sauce..."
                                   value={comp.component}
                                   onChange={(e) => handleComponentChange(index, comp.id, e.target.value)}
                                   />
                               <span 
                                   onClick={() => item.component && removeComponent(comp.id)} 
                                   className="crossIcon"
                               ></span>
                           </div>
                            ))}

                {item.ingredient && item.ingredient.map((ing, ingIndex) =>(
                           <div className="addIngredientsContainer" key={ing?.id}>
                               <label className="recipeLabel tabular-nums" htmlFor="ingredient">{`Ingredient ${ingIndex + 1}`}</label>
                               <input 
                                   type="number"
                                   className="amount"
                                   placeholder="700"
                                   value={ing.amount || ''}
                                   onChange={(e) => {
                                    const limitedValue = maxFiveInputs(+e.target.value);
                                    handleAmountChange(index, ing.id, limitedValue);}}
                               />
                                <input 
                                   type="text"
                                   className="unit"
                                   placeholder="g"
                                   value={ing.unit}
                                   onChange={(e) => handleUnitChange(index, ing.id, e.target.value)}
                               />
                               <input 
                                   type="text"
                                   className="ingredient"
                                   placeholder="Butter"
                                   value={ing.ingredient}
                                   onChange={(e) => handleIngredientChange(index, ing.id, e.target.value)}
                               />
                               <span 
                                   onClick={() => item.ingredient && removeIngredient(ing.id)} 
                                    className="crossIcon"
                               ></span>
                           </div>
                        ))}
                        <div className="addButtons">
                           <button type="button" onClick={() => item.ingredient && addIngredient(index)}>Add ingredient</button>
                           {(!item.component || item.component.length === 0) && 
                           <button type="button" onClick={() => addComponent(index)} > Add Component </button> 
                           }
                       </div>
                </div>
                ))}
                <div className="addButtons">
                    <button type="button" onClick={() => addNewComponent()}>Add component</button>
                </div>
                <div className="recipeSpace"></div>
                <div className="addServingsContainer">
                    <label className="recipeLabel" htmlFor="servings">Servings:</label>
                    <input
                        type="number"
                        value={servings || ""}
                        onChange={(e) => {
                            const limitedValued = maxTwoInputs(+e.target.value);
                            setServings(limitedValued);
                        }}
                    />
                </div>
                <div className="recipeSpace"></div>
                <div className="addRecipeSwitchContainer">
                    <h1>Nutritional values:</h1>
                    <label className="sliderContainer">
                        <input type="checkbox"
                            checked={isChecked}
                            onChange={toggleSlider}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                {isChecked && <>
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
                </>}
                <div className="recipeSpace"></div>
                {recipe.map((item, index)=>
                <React.Fragment key={index}>
                {item.instructions?.map((ins, insIndex) =>
                <div className="addInstructionsContainer" key={insIndex}>
                    <label className="recipeLabel tabular-nums" htmlFor="instruction">{`Instruction ${insIndex + 1}`}</label>
                    <textarea
                        placeholder=""
                        rows={3}
                        value={ins.instruction}
                        onChange={(e) => handleInstructionChange(index, ins.id, e.target.value)}
                    />
                </div>
                )}
                <div className="addButtons">
                    <button type="button" onClick={() => addInstruction(index)}>Add instruction</button>
                </div>
                </React.Fragment>
                )}
            
            </form>
        </>
    );
}