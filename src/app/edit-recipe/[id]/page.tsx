import EditRecipe from "../containers/editRecipe";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <EditRecipe recipe_id={id} />
}
