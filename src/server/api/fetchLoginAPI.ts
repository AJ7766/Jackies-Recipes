export const fetchLoginAPI = async (username: string, password: string) => {
    try {
        let res = await fetch(process.env.NODE_ENV === 'production'
            ? 'https://jackies-recipes.vercel.app/api/login'
            : 'http://localhost:3000/api/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || "Failed to login.", fetchedUser: null};

        return { message: "Login successfully.", fetchedUser: data.processedUser };
    } catch (error) {
        return { message: `Failed to login: ${error}`, fetchedUser: null };
    }
}