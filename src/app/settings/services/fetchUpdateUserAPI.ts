import { UserEditProps } from "@/_models/UserModel";
import cache from "@/app/_config/cache";

export const fetchUpdateUserAPI = async (user: UserEditProps, token: string) => {
    try {
        let res = await fetch("/api/user", {
            method: "PUT",
            body: JSON.stringify({ user }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { message: data.message || "Failed to request edit user.", updated_user: null };
        }
        
        return { message: "Update successfully.", updated_user: data.updated_user };
    } catch (error) {
        return { message: `Failed to update: ${error}`, updated_user: null };
    }
}