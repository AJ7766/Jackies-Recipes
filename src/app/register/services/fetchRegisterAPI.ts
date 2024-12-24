import { UserRegisterProps } from "@/_models/UserModel";

export const fetchRegisterAPI = async (user: UserRegisterProps) => {
    try {
        let res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
            return { message: data.error || "Failed to register" };
        }

        return { message: data.message };
    } catch (error) {
        return { message: `Error to register: ${error}` };
    }
}