"use client"
import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import { ProfilePropsOrNull } from "@/app/types/types";
import { useState } from "react";

export default function EditProfile({user}: {user:ProfilePropsOrNull}){
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [profilePicPreview, setProfilePicPreview] = useState<string>(user?.userContent?.profilePicture || '');
    const [username, setUsername] = useState<string>(user?.username || '');
    const [fullName, setFullName] = useState<string>(user?.fullName || '');
    const [bio, setBio] = useState<string>(user?.userContent?.bio || 'Passionate about sharing authentic Swedish recipes. Dive into the rich flavors and traditions of Swedish cuisine. From classic dishes to modern twists, discover the heart and soul of Sweden&apos;s culinary heritage. Join me on a delicious journey!');
    const [instagram, setInstagram] = useState<string>(user?.userContent?.instagram || '');
    const [x, setX] = useState<string>(user?.userContent?.x || '');
    const [tiktok, setTiktok] = useState<string>(user?.userContent?.tiktok || '');
    const [youtube, setYoutube] = useState<string>(user?.userContent?.youtube || '');
    const [facebook, setFacebook] = useState<string>(user?.userContent?.facebook || '');

    if (!user) {
        return <div>No user data available.</div>;
    }
    
    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setProfilePic(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePicPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(username, fullName, bio, instagram, x, tiktok, youtube, facebook);
    }

    return(
    <div className="editProfileWrapper">
       <form className="editForm" onSubmit={handleSubmit}>
        <div className="editProfileContainer">
        <div className="editProfileInfo">
            <div className="editProfilePicutre">
                <Image src={profilePicture} alt="profile-picture" />
                <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className="editInputContainer">
            <label htmlFor="name">Username:</label>
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
            <h1>Social Media <i className="opacity-50">optional</i></h1>

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
        <button type="submit">Save</button>
    </div>
        </div>
        <div>
        </div>
        </div>
        </form>
    </div>
    )
}