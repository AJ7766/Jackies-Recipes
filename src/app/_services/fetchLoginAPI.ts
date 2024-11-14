export const fetchLoginAPI = async (username: string, password: string) => {
    try {
        let res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to login." };
        }
        return { message: "Login successfully.", token: data.token };
    } catch (error) {
        return { message: `Failed to login: ${error}`, token: null};
    }
}