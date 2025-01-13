"use server"
import { getSession } from "@/_utils/session";

export const handleFollow = async (username: string) => {
    try {
        const { token } = await getSession()
        if (!token)
            return alert('Please login to use this feature');

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

        if (!res.ok) {
            console.error(data.message);
        }

        return;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return;
    }
}

export const handleUnfollow = async (username: string) => {
    try {
        const { token } = await getSession()
        if (!token)
            return alert('Please login to use this feature');

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

        if (!res.ok) {
            console.error(data.message);
        }

        return;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        return;
    }
}