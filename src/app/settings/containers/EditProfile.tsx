"use client"
import { useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { UserEditProps } from "@/_models/UserModel";
import { EditProfileComponent } from "../components/EditProfileComponent";
import { fetchUpdateUserAPI } from "../services/fetchUpdateUserAPI";
import { useRouter } from "next/navigation";
import { convertFileToBase64, convertFileToFormData, getPublicId, validateImage } from "@/_utils/imageUtils";
import { fetchUpdateImageAPI } from "../services/fetchUpdateImageAPI";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1733219780/profile-picture_vicljy.png";

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
  const [cloudinaryData, setCloudinaryData] = useState<FormData>();
  const [publicId, setPublicId] = useState(()=>{
    return getPublicId(userData.userContent?.profilePicture ?? '')
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoadingBtn(true);
      let updatedUserData: UserEditProps = { ...userData };
      if (cloudinaryData) {
        const { data_url } = await fetchUpdateImageAPI(cloudinaryData);
        updatedUserData = {
          ...userData,
          userContent: {
            ...userData.userContent,
            profilePicture: data_url,
          },
        };
      }

      const { message, updated_user } = await fetchUpdateUserAPI(updatedUserData);

      if (!updated_user) {
        return setMessage(message);
      }

      setUser(updated_user);
      sessionStorage.removeItem("user");

      router.push(`/${userData.username}`);
      router.refresh();
    } catch (error: any) {
      setMessage(error.message || "Failed to update.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleProfilePicChange = () => {
    document.getElementById("profilePicInput")?.click();
  };

  const ProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validatedFile = validateImage(file);
      if (validatedFile) {
        const formData = convertFileToFormData(validatedFile, publicId);
        setCloudinaryData(formData);
        const uri = await convertFileToBase64(validatedFile);
        if (uri) {
          setUserData((prev) => ({
            ...prev,
            userContent: {
              ...prev.userContent,
              profilePicture: uri,
            },
          }));
        }
      }
    };
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
