import Image from "next/image";

interface RecipeIngredientsProps {
    servings?: number;
    ingredients?: {
        component?: string;
        ingredients?: { amount?: number; unit?: string; ingredient: string }[]; // Optional amount
    }[];
}

export const RecipeIngredients = ({ servings, ingredients }: RecipeIngredientsProps) => (
    <div className="recipeIngredientsContainer">
        {servings && servings > 0 && (
            <div className="mealsContainer">
                <Image src="/images/icons/meal.svg" width={24} height={24} alt="servings" />
                <p>{servings}</p>
            </div>
        )}
        {ingredients?.map((ingList, ingListIndex) => (
            <table key={ingListIndex}>
                <tbody>
                    {ingList.component && (
                        <tr>
                            <td colSpan={2} className="recipeTitle">
                                {ingList.component}
                            </td>
                        </tr>
                    )}
                    {ingList.ingredients?.map((ing, ingIndex) => (
                        <tr key={ingIndex}>
                            <td className="amount">
                                {ing.amount || ing.amount === 0 ? (
                                    `${ing.amount} ${ing.unit || ''}`
                                ) : (
                                    ''
                                )}
                            </td>
                            <td>{ing.ingredient}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </div>
);
