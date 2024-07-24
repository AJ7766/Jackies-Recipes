"use client"
import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import camera from "@/app/images/test/camera.svg";
import { ProfileProps, ProfilePropsOrNull } from "@/app/types/types";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function EditProfile({user}: {user:ProfilePropsOrNull}){
    const [profilePicPreview, setProfilePicPreview] = useState<string>(user?.userContent?.profilePicture || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [fullName, setFullName] = useState<string>(user?.fullName || '');
    const [bio, setBio] = useState<string>(user?.userContent?.bio || 'Passionate about sharing authentic Swedish recipes. Dive into the rich flavors and traditions of Swedish cuisine. From classic dishes to modern twists, discover the heart and soul of Sweden&apos;s culinary heritage. Join me on a delicious journey!');
    const [instagram, setInstagram] = useState<string>(user?.userContent?.instagram || '');
    const [x, setX] = useState<string>(user?.userContent?.x || '');
    const [tiktok, setTiktok] = useState<string>(user?.userContent?.tiktok || '');
    const [youtube, setYoutube] = useState<string>(user?.userContent?.youtube || '');
    const [facebook, setFacebook] = useState<string>(user?.userContent?.facebook || '');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);

    if (!user) {
        return <div>No user data available.</div>;
    }
    
    const handleProfilePicChange = () => {
        document.getElementById("profilePicInput")?.click();
      };

    const ProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 20 * 1024 * 1024;
        
        if (!allowedMimeTypes.includes(file.type)) {
            alert('Please upload an image file (JPEG, PNG, WEBP).');
            return;
        }
        
        if (file.size > maxSize) {
            alert('File size exceeds 20 MB.');
            return;
        }
            try {
                Resizer.imageFileResizer(
                  file,
                  200, // max width
                  200, // max height
                  'JPEG', // format
                  90, // quality
                  0, // rotation
                  (uri) => {
                    if (typeof uri === 'string') {
                      setProfilePicPreview(uri);
                      console.log('Base64 string of resized image:', uri);
                    } else {
                      console.error('Unexpected type:', uri);
                    }
                  },
                  'base64' // output type
                );
              } catch (error) {
                console.error('Error resizing image:', error);
              }
        }
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedProfile: ProfileProps = {
        _id: user._id,
        username,
        fullName,
        userContent: {
            profilePicture: profilePicPreview || '',
          bio,
          instagram,
          x,
          tiktok,
          youtube,
          facebook,
        }
      };
        try {
            console.log("Submitting profile:", updatedProfile);
            let res = await fetch("/api/edit-profile", {
              method: "POST",
              body: JSON.stringify({user: updatedProfile}),
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (!res.ok) {
              const errorResponse = await res.json();
              throw new Error(errorResponse.message || "Failed to register.");
            } 
            else if(res.ok){
              let successResponse = await res.json();
              console.log("Registration successful:", successResponse);
            }}catch (error:any) {
            console.error("Error:", error);
            setError(error.message || "Failed to register.");
          }finally{
            setLoadingBtn(false);
          }
        };

    return(
    <div className="editProfileWrapper">
       <form className="editForm" onSubmit={handleSubmit}>
        <div className="editProfileContainer">
        <div className="editProfileInfo">
            <div className="editProfilePicutre" onClick={handleProfilePicChange}>
                <div className="editProfilePictureCanvas">
                <Image height={160} width={160} className="editPreviewProfilePicture" src={profilePicPreview || profilePicture} alt="profile-picture" />
                <input
                id="profilePicInput"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={ProfilePicChange}
              />
              </div>
            <Image className="editCamera" src={camera} alt="camera" />
            </div>

            <div className="editInputContainer">
            <label htmlFor="email">Email:</label>
            <input 
                id="email" 
                type="text" 
                placeholder="Email"
                value={email} 
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>

            <div className="editInputContainer">
            <label htmlFor="username">Username:</label>
            <input 
                id="username" 
                type="text" 
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>

            <div className="editInputContainer">
            <label htmlFor="name">Name:</label>
            <input 
                id="name" 
                type="text" 
                placeholder="Name"
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
            />
        </div>

        <div className="editTextareaContainer">
            <label htmlFor="bio">Bio:</label>
            <textarea 
                id="bio" 
                placeholder="bio"
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
            <h1>Social Media <i className="opacity-50 absolute ml-1 text-xs">optional</i></h1>
            <div className="editSocialMediaWrapper">
            <div className="editSocialMediaContainer">
            <label htmlFor="instagram">Instagram:</label>
            <input 
                id="instagram" 
                className="socialMediaInputs"
                type="text" 
                placeholder="optional"
                value={instagram} 
                onChange={(e) => setInstagram(e.target.value)}
            />
        </div>

        <div className="editSocialMediaContainer">
            <label htmlFor="x">X:</label>
            <input 
                id="x" 
                className="socialMediaInputs"
                type="text" 
                placeholder="optional"
                value={x} 
                onChange={(e) => setX(e.target.value)}
            />
        </div>

        <div className="editSocialMediaContainer">
            <label htmlFor="tiktok">TikTok:</label>
            <input 
                id="tiktok" 
                className="socialMediaInputs"
                type="text" 
                placeholder="optional"
                value={tiktok} 
                onChange={(e) => setTiktok(e.target.value)}
            />
        </div>

        <div className="editSocialMediaContainer">
            <label htmlFor="youtube">Youtube:</label>
            <input 
                id="youtube" 
                className="socialMediaInputs"
                type="text" 
                placeholder="optional"
                value={youtube} 
                onChange={(e) => setYoutube(e.target.value)}
            />
        </div>

        <div className="editSocialMediaContainer">
            <label htmlFor="facebook">Facebook:</label>
            <input 
                id="facebook" 
                className="socialMediaInputs"
                type="text" 
                placeholder="optional"
                value={facebook} 
                onChange={(e) => setFacebook(e.target.value)}
            />
        </div>
    </div>
    <h1>Change Password</h1>
    <div className="editPasswordContainer">
            <label htmlFor="name">Old Password:</label>
            <input 
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)}
            />
        </div>
        
        <div className="editPasswordContainer">
            <label htmlFor="name">New Password:</label>
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>

        <div className="editPasswordContainer">
            <label htmlFor="name">Confirm Password:</label>
            <input 
                id="name" 
                type="password" 
                className="socialMediaInputs"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
    <button type="submit">Save</button>
        </div>
        <div>
        </div>
        </div>
        </form>
    </div>
    )
}