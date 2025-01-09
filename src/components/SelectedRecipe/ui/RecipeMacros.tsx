interface RecipeMacrosProps {
    macros: {
        carbs?: number;
        protein?: number;
        fat?: number;
        calories?: number;
    };
}

export const RecipeMacros = ({ macros }: RecipeMacrosProps) => {
    const { carbs, protein, fat, calories } = macros;

    if (!(carbs || protein || fat || calories)) return null;
    return (
        <div className="recipeMacroContainer">
            <div className="nutritionContainer">
                <div className="macroContainer">
                    {carbs && carbs > 0 && (
                        <div className="macroInfo">
                            <p>Carbs</p>
                            <div className="carbsColor"></div>
                            <p>{carbs}g</p>
                        </div>
                    )}
                    {protein && protein > 0 && (
                        <div className="macroInfo">
                            <p>Protein</p>
                            <div className="proteinColor"></div>
                            <p>{protein}g</p>
                        </div>
                    )}
                    {fat && fat > 0 && (
                        <div className="macroInfo">
                            <p>Fat</p>
                            <div className="fatColor"></div>
                            <p>{fat}g</p>
                        </div>
                    )}
                    {calories && calories> 0 && (
                        <div className="macroInfo" id="macroInfoCalories">
                            <p>Calories</p>
                            <div className="caloriesColor"></div>
                            <p>{calories}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};