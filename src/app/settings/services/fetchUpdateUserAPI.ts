import { UserEditProps } from "@/models/UserModel";

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
            return { message: data.message || "Failed to request edit user.", success: false };
        }

        return { message: "Update successfully.", success: true };
    } catch (error) {
        return { message: `Failed to update: ${error}`, success: false };
    }
}