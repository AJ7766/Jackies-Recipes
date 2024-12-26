import { UserEditProps } from "@/_types/UserTypes";

export const fetchUpdateUserAPI = async (user: UserEditProps) => {
    try {
        let res = await fetch("/api/user", {
            method: "PUT",
            body: JSON.stringify({ user }),
            headers: {
                "Content-Type": "application/json",
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