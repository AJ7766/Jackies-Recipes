import { UserEditProps } from "@/_models/UserModel";
import Image from "next/image";
import React from "react";
const profilePicture = "/images/profile-picture.png";
const camera = "/images/camera.svg";

interface EditProfileProps {
  user: UserEditProps;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleProfilePicChange: () => void;
  ProfilePicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  loadingBtn: boolean;
  message: string;
}

export const EditProfileComponent = React.memo(({
  user,
  handleSubmit,
  handleInputChange,
  handleProfilePicChange,
  ProfilePicChange,
  message,
  loadingBtn,
}: EditProfileProps) => {
  return (
    <form className="editForm" onSubmit={handleSubmit}>
      <div className="editProfilePicutre" onClick={handleProfilePicChange}>
        <Image
          height={200}
          width={200}
          className="editPreviewProfilePicture"
          src={user.userContent?.profilePicture || profilePicture}
          alt="profile-picture"
        />
        <input
          id="profilePicInput"
          name="profilePicture"
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
          value={user.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="editInputContainer">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="editInputContainer">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={user.fullName}
          onChange={handleInputChange}
        />
      </div>

      <div className="editTextareaContainer">
        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          maxLength={350}
          placeholder="bio"
          value={user.userContent?.bio}
          onChange={handleInputChange}
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
            value={user.userContent?.instagram}
            onChange={handleInputChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="x">X:</label>
          <input
            className="socialMediaInputs"
            name="x"
            type="text"
            placeholder="optional"
            value={user.userContent?.x}
            onChange={handleInputChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="tiktok">TikTok:</label>
          <input
            className="socialMediaInputs"
            name="tiktok"
            type="text"
            placeholder="optional"
            value={user.userContent?.tiktok}
            onChange={handleInputChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="youtube">Youtube:</label>
          <input
            className="socialMediaInputs"
            name="youtube"
            type="text"
            placeholder="optional"
            value={user.userContent?.youtube}
            onChange={handleInputChange}
          />
        </div>

        <div className="editSocialMediaContainer">
          <label htmlFor="facebook">Facebook:</label>
          <input
            className="socialMediaInputs"
            name="facebook"
            type="text"
            placeholder="optional"
            value={user.userContent?.facebook}
            onChange={handleInputChange}
          />
        </div>

      </div>
      <h1>Change Password</h1>
      <div className="editPasswordContainer">
        <label htmlFor="name">Old Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          autoComplete="current-password"
        />
      </div>

      <div className="editPasswordContainer">
        <label htmlFor="name">New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={user.newPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
        />
      </div>

      <div className="editPasswordContainer">
        <label htmlFor="name">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className="h-5">
        {message && <div className="text-red-600">{message}</div>}
      </div>
      <button type="submit" disabled={loadingBtn}>
        {loadingBtn ? "Loading..." : "Save"}
      </button>
      <div></div>
    </form>
  )
});
