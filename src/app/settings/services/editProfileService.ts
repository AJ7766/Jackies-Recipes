export const fetchUpdateProfileImageAPI = async (formData: FormData) => {
    try {
        const res = await fetch('/api/cloudinary', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok)
            throw new Error("Failed uploading image to Cloudinary")
        const data = await res.json();
        return data.url
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}