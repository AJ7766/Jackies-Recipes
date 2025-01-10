"use server"
import { getSession } from "@/_utils/session";

export const postNewFollowerAPI = async (username: string) => {
    const { token } = await getSession()
    try {
        const res = await fetch(process.env.NODE_ENV === 'production'
            ? 'https://jackies-recipes.vercel.app/api/followers'
            : 'http://localhost:3000/api/followers', {
            method: 'POST',
            body: JSON.stringify(username),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || 'Failed to follow user', success: false };

        return { message: data.message, success: true };
    } catch (error) {
        return { message: error || 'Failed to follow user', success: false };
    }
}

export const updateUnfollowerAPI = async (username: string) => {
    const { token } = await getSession()
    try {
        const res = await fetch(process.env.NODE_ENV === 'production'
            ? 'https://jackies-recipes.vercel.app/api/followers'
            : 'http://localhost:3000/api/followers', {
            method: 'PUT',
            body: JSON.stringify(username),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await res.json();

        if (!res.ok)
            return { message: data.message || 'Failed to unfollow user', success: false };

        return { message: data.message, success: true };
    }
    catch (error) {
        return { message: error || 'Failed to unfollow user', success: false };
    }
}