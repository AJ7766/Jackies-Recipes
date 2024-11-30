"use client"
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_context/AuthContext";
import { UserEditProps } from "@/_models/UserModel";
import { EditProfileComponent } from "../components/EditProfileComponent";
import { fetchUpdateUserAPI } from "../services/fetchUpdateUserAPI";
import { useRouter } from "next/navigation";
import { convertFileToBase64, convertFileToFormData, validateImage } from "@/_utils/imageUtils";
import { fetchUpdateImageAPI } from "../services/fetchUpdateImageAPI";
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
  const [cloudinaryData, setCloudinaryData] = useState<FormData>();
  const [publicId, setPublicId] = useState('');
  const router = useRouter();

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

  useEffect(() => {
    if (userData.userContent?.profilePicture) {
      const extractedUrl = userData.userContent?.profilePicture.split('/').pop()
      if (extractedUrl) {
        const public_id = extractedUrl.split('.')[0];

        setPublicId(public_id);
      }
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!user || !token) {
      throw new Error("User or Token is not available");
    }

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

      const { message, updated_user } = await fetchUpdateUserAPI(updatedUserData, token);

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
