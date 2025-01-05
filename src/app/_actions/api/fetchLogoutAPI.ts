export const fetchGetLogoutAPI = async () => {
    try {
        let res = await fetch(process.env.NODE_ENV === 'production'
            ? 'https://jackies-recipes-git-updating-ssr-jackie-huynhs-projects.vercel.app/api/logout'
            : 'http://localhost:3001/api/logout', {
            method: "GET",
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || "Failed to logout", success: false};
        
        return { message: data.message, success: true };
    } catch (error) {
        return { message: error, success: false };
    }
}