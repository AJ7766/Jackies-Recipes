export const fetchLoginAPI = async (username: string, password: string) => {
    try {
        let res = await fetch(process.env.NODE_ENV === 'production'
            ? 'https://jackies-recipes-git-updating-ssr-jackie-huynhs-projects.vercel.app/api/login'
            : 'http://localhost:3001/api/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || "Failed to login.", fetchedUser: null, success: false };

        return { message: "Login successfully.", fetchedUser: data.processedUser, success: true };
    } catch (error) {
        return { message: `Failed to login: ${error}`, fetchedUser: null, success: false };
    }
}