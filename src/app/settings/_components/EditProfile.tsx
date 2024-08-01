"use client"
import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import camera from "@/app/images/test/camera.svg";
import { EditFormProps, ProfileProps, ProfilePropsOrNull } from "@/app/types/types";
import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { useAuth } from "@/app/context/AuthContext";
import SettingsError from "./SettingsErrorPage";

export default function EditProfile({user}: {user:ProfilePropsOrNull}){
    const [profilePicPreview, setProfilePicPreview] = useState<string>(user?.userContent?.profilePicture || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [fullName, setFullName] = useState<string>(user?.fullName || '');
    const [bio, setBio] = useState<string>(user?.userContent?.bio || '');
    const [instagram, setInstagram] = useState<string>(user?.userContent?.instagram || '');
    const [x, setX] = useState<string>(user?.userContent?.x || '');
    const [tiktok, setTiktok] = useState<string>(user?.userContent?.tiktok || '');
    const [youtube, setYoutube] = useState<string>(user?.userContent?.youtube || '');
    const [facebook, setFacebook] = useState<string>(user?.userContent?.facebook || '');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [success, setSuccess] = useState('');
    const [successBoolean, setSuccessBoolean] = useState(false);
    const [error, setError] = useState('');
    const [errorBoolean, setErrorBoolean] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const { updateUser } = useAuth();

    if (!user) {
        const errorPage = SettingsError();
        return errorPage;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    const updatedProfile: EditFormProps = {
        _id: user._id,
        email,
        username,
        fullName,
        oldPassword,
        newPassword,
        confirmPassword,
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
              body: JSON.stringify({user: updatedProfile, userId: user._id, newPassword: newPassword, confirmPassword: confirmPassword}),
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
              setErrorBoolean(false);
              setSuccessBoolean(true);
              setSuccess("Successfully Saved!");
              updateUser(successResponse.updatedUser);
              window.location.reload();
            }}catch (error:any) {
            console.error("Error:", error.message, error);
            setSuccessBoolean(false);
            setErrorBoolean(true);
            setError(error.message || "Failed to register.");
          }finally{
            setLoadingBtn(false);
          }
        };

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
                      600, // max width
                      600, // max height
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

    return(
       <form className="editForm" onSubmit={handleSubmit}>
            <div className="editProfilePicutre" onClick={handleProfilePicChange}>
                <Image height={160} width={160} className="editPreviewProfilePicture" src={profilePicPreview || profilePicture} alt="profile-picture" 
                />
                <input
                id="profilePicInput"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={ProfilePicChange}
              />
            <Image className="editCamera" src={camera} alt="camera" />
            </div>

            <div className="editInputContainer">
            <label htmlFor="email">Email:</label>
            <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

            <div className="editInputContainer">
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>

            <div className="editInputContainer">
            <label htmlFor="name">Name:</label>
            <input 
                type="text" 
                placeholder="Name"
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
            />
        </div>

        <div className="editTextareaContainer">
            <label htmlFor="bio">Bio:</label>
            <textarea
                maxLength={350}
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
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
        <div className="h-5">
        {errorBoolean ? <div className="text-red-600">{error}</div> : <div></div>}
        {successBoolean ? <div className="text-green-600">{success}</div> : <div></div>}
        </div>
    <button type="submit" disabled={loadingBtn}>Save</button>
        <div>
        </div>
        </form>
    )
}