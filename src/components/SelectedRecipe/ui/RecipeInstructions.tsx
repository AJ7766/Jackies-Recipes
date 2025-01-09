interface RecipeInstructionsProps {
    instructions: { instruction: string }[];
}

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => (
    <div className="recipeInstructionsContainer">
        <table>
            <tbody>
                {instructions.map((ins, insIndex) => (
                    <tr className="flex" key={insIndex}>
                        <td id="instructionIndex">{insIndex + 1}.</td>
                        <td>{ins.instruction}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
