export const fetchGetUserAPI = async (token: string) => {
    try {
        const res = await fetch("/api/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to fetch user" };
        }
        return { message: "Fetch user successfully", fetchedUser: data.user };
    } catch (error) {
        return { message: `Failed to fetch user: ${error}`, fetchedUser: null };
    }
}