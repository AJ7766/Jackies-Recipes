import SelectedRecipe from "./containers/SelectedRecipe";

export default async function RecipePage({ params }: { params: Promise<{ recipe: string }> }) {
  const { recipe } = await params;
  
  return <SelectedRecipe recipe_id={recipe}/>
}