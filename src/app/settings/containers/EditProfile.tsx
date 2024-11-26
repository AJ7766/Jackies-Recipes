"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { UserEditProps } from "@/_models/UserModel";
import { fetchUpdateUserAPI } from "../services/fetchUpdateUserAPI";
import { useRouter } from "next/navigation";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { EditProfileComponent } from "../components/EditProfileComponent";
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
  const [resource, setResource] = useState<string | CloudinaryUploadWidgetInfo | undefined>(undefined);
  const router = useRouter()

  useEffect(() => {
    console.log("Cloudinary:", resource)
  }, [resource])
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
    console.log("submitting")
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

  const CloudinaryPicChange = (url: string) => {
    setUserData((prev) => ({
      ...prev,
      userContent: {
        ...prev.userContent,
        profilePicture: url,
      },
    }));
  }

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
    message={message}
    loadingBtn={loadingBtn}
    CloudinaryPicChange={CloudinaryPicChange}
  />
);
}
