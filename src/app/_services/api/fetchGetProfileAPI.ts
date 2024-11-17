export const fetchGetProfileAPI = async (username: string) => {
    try {
        let res = await fetch(`/api/profile?username=${username}`, {
            method: "GET",
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || "Failed to fetch profile" };

        return { message: "Fetching profile successfully", fetchedProfile: data.profile };
    } catch (error) {
        return { message: `Failed to fetch profile: ${error}`, fetchedProfile: null };
    }
}