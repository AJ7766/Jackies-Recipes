"use client";
import Image from "next/image";
import { EditFormProps, ProfilePropsOrNull } from "@/app/types/types";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
const profilePicture = "/images/profile-picture.png";
const camera = "/images/test/camera.svg";

export default function EditProfile({ user }: { user?: ProfilePropsOrNull }) {
  const [userData, setUserData] = useState<EditFormProps>({
    email: user?.email || "",
    username: user?.username || "",
    fullName: user?.fullName || "",
    oldPassword: "",
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { deleteCachedUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUserData({
        _id: user._id,
        email: user.email || "",
        username: user.username || "",
        fullName: user.fullName || "",
        oldPassword: "",
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
      let res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({
          user: userData,
          userId: user?._id,
          newPassword: userData.newPassword,
          confirmPassword: userData.confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to update.");
      }
      deleteCachedUser();
      router.push(`/${user?.username}`);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to update.");
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
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      userContent: {
        ...prev.userContent,
        [name]: value,
      },
    }));
  };

  return (
    <form className="editForm" onSubmit={handleSubmit}>
      <div className="editProfilePicutre" onClick={handleProfilePicChange}>
        <Image
          height={200}
          width={200}
          className="editPreviewProfilePicture"
          src={userData.userContent?.profilePicture || profilePicture}
          alt="profile-picture"
        />
        <input
          id="profilePicInput"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={ProfilePicChange}
        />
        <Image
          className="editCamera"
          width={50}
          height={50}
          src={camera}
          alt="camera"
        />
      </div>

      <div className="editInputContainer">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="editInputContainer">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="editInputContainer">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={userData.fullName}
          onChange={handleInputChange}
        />
      </div>

      <div className="editTextareaContainer">
        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          maxLength={350}
          placeholder="bio"
          value={userData.userContent?.bio}
          onChange={handleUserContentChange}
        />
      </div>
      <h1>
        Social Media{" "}
        <i className="opacity-50 absolute ml-1 text-xs">optional</i>
      </h1>
      <div className="editSocialMediaWrapper">
        <div className="editSocialMediaContainer">
          <label htmlFor="instagram">Instagram:</label>
          <input
            className="socialMediaInputs"
            name="instagram"
            type="text"
            placeholder="optional"
            value={userData.userContent?.instagram}
            onChange={handleUserContentChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="x">X:</label>
          <input
            className="socialMediaInputs"
            name="x"
            type="text"
            placeholder="optional"
            value={userData.userContent?.x}
            onChange={handleUserContentChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="tiktok">TikTok:</label>
          <input
            className="socialMediaInputs"
            name="tiktok"
            type="text"
            placeholder="optional"
            value={userData.userContent?.tiktok}
            onChange={handleUserContentChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="youtube">Youtube:</label>
          <input
            className="socialMediaInputs"
            name="youtube"
            type="text"
            placeholder="optional"
            value={userData.userContent?.youtube}
            onChange={handleUserContentChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="facebook">Facebook:</label>
          <input
            className="socialMediaInputs"
            name="facebook"
            type="text"
            placeholder="optional"
            value={userData.userContent?.facebook}
            onChange={handleUserContentChange}
          />
        </div>
      </div>
      <h1>Change Password</h1>
      <div className="editPasswordContainer">
        <label htmlFor="name">Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          value={userData.oldPassword}
          onChange={handleInputChange}
        />
      </div>

      <div className="editPasswordContainer">
        <label htmlFor="name">New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={userData.newPassword}
          onChange={handleInputChange}
        />
      </div>

      <div className="editPasswordContainer">
        <label htmlFor="name">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="h-5">
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      </div>
      <button type="submit" disabled={loadingBtn}>
        {loadingBtn ? "Loading..." : "Save"}
      </button>
      <div></div>
    </form>
  );
}
