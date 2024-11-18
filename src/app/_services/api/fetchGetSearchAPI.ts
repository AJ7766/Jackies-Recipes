export const fetchGetSearchAPI = async (debouncedSearch: string) => {
    try {
        const res = await fetch(`/api/search?search=${debouncedSearch}`, {
            method: "GET",
        });

        const data = await res.json();

        if (!res.ok) 
            return { message: data.message || "Failed to fetch user & recipe", fetchedUsers: null, fetchedRecipes: null };
        
        return { message: "Fetch user & recipe successfully", fetchedUsers: data.searchedUsers, fetchedRecipes: data.searchedRecipes };
    } catch (error: any) {
        return { message: `Failed to fetch user & recipe: ${error}`, fetchedUsers: null, fetchedRecipes: null};
    }
};
