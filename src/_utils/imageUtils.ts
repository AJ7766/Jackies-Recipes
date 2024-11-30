import Resizer from "react-image-file-resizer";

export const validateImage = (file: File) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedMimeTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG, WEBP).");
        return;
    }

    if (file.size > maxSize) {
        alert("File size exceeds 20 MB.");
        return;
    }

    return file;
}

export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            600, // max width
            600, // max height
            "JPEG", // format
            90, // quality
            0, // rotation
            (uri) => {
                if (typeof uri === "string") {
                    resolve(uri);
                } else {
                    reject(new Error("Unexpected type for resized image URI"));
                }
            },
            "base64"
        );
    }
    )
}

export const convertFileToFormData = (file: File, public_id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("public_id", public_id)

    return formData;
}