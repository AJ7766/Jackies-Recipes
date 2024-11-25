export const fetchGetLogoutAPI = async () => {
    try {
        let res = await fetch(`/api/logout`, {
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