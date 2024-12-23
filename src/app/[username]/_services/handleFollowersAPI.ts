export const postNewFollowerAPI = async (username: string) => {
    try {
        const res = await fetch('/api/followers', {
            method: 'POST',
            body: JSON.stringify(username),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
    try {
        const res = await fetch('/api/followers', {
            method: 'PUT',
            body: JSON.stringify(username),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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