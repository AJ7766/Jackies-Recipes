"use client"
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useAuth } from "@/app/_context/AuthContext";
import { UserEditProps, UserProps } from "@/_models/UserModel";
import { fetchUpdateUserAPI } from "../services/fetchUpdateUserAPI";
import EditProfileComponent from "../components/EditProfileComponent";
const profilePicture = "/images/profile-picture.png";

export default function EditProfile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserEditProps>({
    email: user?.email || "",
    username: user?.username || "",
    fullName: user?.fullName || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    userContent: {
      profilePicture: user?.userContent?.profilePicture || profilePicture,
      bio: user?.userContent?.bio || "",
      instagram: user?.userContent?.instagram || "",
      x: user?.userContent?.x || "",
      tiktok: user?.userContent?.tiktok || "",
      youtube: user?.userContent?.youtube || "",
      facebook: user?.userContent?.facebook || "",
    },
  });
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { deleteCachedUser } = useAuth();

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        username: user.username || "",
        fullName: user.fullName || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        userContent: {
          profilePicture: user.userContent?.profilePicture || profilePicture,
          bio: user.userContent?.bio || "",
          instagram: user.userContent?.instagram || "",
          x: user.userContent?.x || "",
          tiktok: user.userContent?.tiktok || "",
          youtube: user.userContent?.youtube || "",
          facebook: user.userContent?.facebook || "",
        },
      });
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!user || !token) {
      throw new Error("User or Token is not available");
    }

    try {
      setLoadingBtn(true);
      const { message, success } = await fetchUpdateUserAPI(userData, token);

      if (!success) {
        return setMessage(message);
      }

      deleteCachedUser();
      window.location.href = `/${userData.username}`;
    } catch (error: any) {
      setMessage(error.message || "Failed to update.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleProfilePicChange = () => {
    document.getElementById("profilePicInput")?.click();
  };

  const ProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 20 * 1024 * 1024;

      if (!allowedMimeTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG, WEBP).");
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds 20 MB.");
        return;
      }
      try {
        Resizer.imageFileResizer(
          file,
          600, // max width
          600, // max height
          "JPEG", // format
          90, // quality
          0, // rotation
          (uri) => {
            if (typeof uri === "string") {
              setUserData((prev) => ({
                ...prev,
                userContent: {
                  ...prev.userContent,
                  profilePicture: uri,
                },
              }));
            } else {
              console.error("Unexpected type:", uri);
            }
          },
          "base64"
        );
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      if (name in (prev.userContent || {})) {
        return {
          ...prev,
          userContent: {
            ...prev.userContent,
            [name]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  return (
    <EditProfileComponent
      user={userData}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleProfilePicChange={handleProfilePicChange}
      ProfilePicChange={ProfilePicChange}
      message={message}
      loadingBtn={loadingBtn}
    />
  );
}
