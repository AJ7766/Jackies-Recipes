"use client"
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useAuth } from "@/app/_context/AuthContext";
import { UserEditProps } from "@/_models/UserModel";
import { EditProfileComponent } from "../components/EditProfileComponent";
import { fetchUpdateUserAPI } from "../services/fetchUpdateUserAPI";
import { useRouter } from "next/navigation";
const profilePicture = "/images/profile-picture.png";

export default function EditProfile() {
  const { user, setUser } = useAuth();
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
  const router = useRouter()

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
      const { message, updated_user } = await fetchUpdateUserAPI(userData, token);

      if (!updated_user) {
        return setMessage(message);
      }

      setUser(updated_user);
      sessionStorage.removeItem("profile");

      router.push(`/${userData.username}`);
      router.refresh();
      //window.location.href = (`/${userData.username}`);
    } catch (error: any) {
      setMessage(error.message || "Failed to update.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleProfilePicChange = () => {
    document.getElementById("profilePicInput")?.click();
  };

  const ProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch('/api/cloudinary', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setUserData((prev) => ({
            ...prev,
            userContent: {
              ...prev.userContent,
              profilePicture: data.url,
            },
          }));
          console.log("Image uploaded successfully:", data.url);
        } else {
          console.error("Error uploading image to Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
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
