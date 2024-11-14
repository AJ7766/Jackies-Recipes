export const fetchRecipesAPI = async () => {
    try {
        let res = await fetch(`/api/all-recipes`, {
            method: "GET",
        });
        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to fetch recipes" };
        }
        return { message: "Successfully fetching recipes", recipes: data.recipes };
    } catch (error: any) {
        return { message: `Failed to fetch recipes: ${error}`, recipes: null};
    }

};