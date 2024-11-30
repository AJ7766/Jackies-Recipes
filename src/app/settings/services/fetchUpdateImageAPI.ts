export const fetchUpdateImageAPI = async (formData: FormData) => {
    try {
        const res = await fetch('/api/cloudinary', {
            method: 'POST',
            body: formData
        });
        if (!res.ok)
            throw new Error("Failed uploading image to Cloudinary")
        const data = await res.json();

        return { message: 'Success uploading to Cloudinary', data_url: data.url }
    } catch (error) {
        return { message: "Error uploading image:", data_url: null }
    }
}