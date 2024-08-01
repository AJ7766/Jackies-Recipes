import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function AddRecipeForm(){

    type IngredientsList = {
        component?: ComponentProps[];
        ingredient?: IngredientProps[];
    }

    type ComponentProps = {
        id: string;
        component: string;
    }

    type IngredientProps = {
        id: string;
        amount: string;
        unit: string;
        ingredient: string;
    }

    const [recipeName, setRecipeName] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [carbohydrates, setCarbohydrates] = useState<number>();
    const [protein, setProtein] = useState<number>();
    const [fat, setFat] = useState<number>();
    const [calories, setCalories] = useState<number>();
    const [caloriesPlaceholder, setCaloriesPlaceholder] = useState<number>();
    const [ingredientList, setIngredientList] = useState<IngredientsList[]>([
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
        }]
        }
    ]);
    const [unit, setUnit] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [servings, setServings] = useState<number>();

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
        const updatedIngredientList = ingredientList.map((item, index) => {
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
        setIngredientList(updatedIngredientList);
    };

    const handleAmountChange = (itemIndex: number, id: string, newValue: string) => {
        const updatedIngredientList = ingredientList.map((item, index) => {
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
        setIngredientList(updatedIngredientList);
    };

    const addComponent = (index: number) => {
        const newComponent: ComponentProps = {
            id: uuidv4(),
            component: ''
        };

        setIngredientList(prevList => {
            // Make a copy of the list
            const updatedList = [...prevList];
    
            // Update the specific IngredientsList item
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
            amount:'',
            unit: '',
            ingredient: ''
        };
    
        setIngredientList(prevList => {
            // Make a copy of the list
            const updatedList = [...prevList];
    
            // Update the specific IngredientsList item
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
        const newIngredientList: IngredientsList = {
            component: [{
                id: uuidv4(),
                component: ''
            }],
            ingredient: [{
                id: uuidv4(),
                amount:'',
                unit: '',
                ingredient: ''
            }]
        };
        setIngredientList([...ingredientList, newIngredientList]);
    }

    const removeComponent = (id: string) => {
        setIngredientList(prevList =>
            prevList.map(item => ({
                ...item,
                component: (item.component || []).filter(comp => comp.id !== id),
            }))
            .filter(item => (item.component && item.component.length > 0) || (item.ingredient && item.ingredient.length > 0))

        );
        console.log(ingredientList)
    };
 
    const removeIngredient = (id: string) => {
        setIngredientList(prevList =>
            prevList.map(item => ({
                ...item,
                ingredient: (item.ingredient || []).filter(ing => ing.id !== id)
            }))
            .filter(item => (item.component && item.component.length > 0) || (item.ingredient && item.ingredient.length > 0))
        );
        console.log(ingredientList)
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
                <div className="addRecipeSwitchContainer">
                    <h1>Nutritional value:</h1>
                    <label className="sliderContainer">
                        <input type="checkbox"
                            checked={isChecked}
                            onChange={toggleSlider}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                {isChecked && <>
                    <div className="recipeSpace"></div>
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
                    <div className="recipeSpace"></div>
                </>}

                {ingredientList.map((item, index) => (
                <div className="IngredientList" key={index}>
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

                {item.ingredient && item.ingredient.map((ing) =>(
                           <div className="addIngredientsContainer" key={ing?.id}>
                               <label className="recipeLabel" htmlFor="ingredient">Ingredient:</label>
                               <input 
                                   type="text"
                                   className="amount"
                                   placeholder="700"
                                   value={ing.amount}
                                   onChange={(e) => handleAmountChange(index, ing.id, e.target.value)}
                               />
                                <input 
                                   type="text"
                                   className="unit"
                                   placeholder="g"
                                   value={unit || ''}
                                   onChange={(e) => setUnit(e.target.value)}
                               />
                               <input 
                                   type="text"
                                   className="ingredient"
                                   placeholder="Butter"
                                   value={ingredient || ''}
                                   onChange={(e) => setIngredient(e.target.value)}
                               />
                               <span 
                                   onClick={() => item.ingredient && removeIngredient(ing.id)} 
                                    className="crossIcon"
                               ></span>
                           </div>
                        ))}
                        <div className="addIngredientsButtons">
                           <button type="button" onClick={() => item.ingredient && addIngredient(index)}>Add ingredient</button>
                           {(!item.component || item.component.length === 0) && 
                           <button type="button" onClick={() => addComponent(index)} > Add Component </button> 
                           }
                       </div>
                </div>
                ))}
                <div className="addIngredientsButtons">
                    <button type="button" onClick={() => addNewComponent()}>Add component</button>
                </div>
                <div className="recipeSpace"></div>

                <div className="recipeTitleContainer">
                    <label className="recipeLabel" htmlFor="recipe-name">Servings:</label>
                    <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(+e.target.value)}
                    />
                </div>
            </form>
        </>
    );
}