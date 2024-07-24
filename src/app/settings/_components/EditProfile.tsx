"use client"
import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import instagramImg from "@/app/images/social-media/instagram.svg";
import xImg from "@/app/images/social-media/x.svg";
import tiktokImg from "@/app/images/social-media/tiktok.svg";
import youtubeImg from "@/app/images/social-media/youtube.svg";
import facebookImg from "@/app/images/social-media/facebook.svg";
import { ProfileProps, ProfilePropsOrNull } from "@/app/types/types";
import { useState } from "react";

export default function EditProfile({user}: {user:ProfilePropsOrNull}){
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

    const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleChangeBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    const handleInstagram = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(event.target.value);
    };

    const handleX = (event: React.ChangeEvent<HTMLInputElement>) => {
        setX(event.target.value);
    };
    const handleTiktok = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTiktok(event.target.value);
    };
    const handleYoutube = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYoutube(event.target.value);
    };
    const handleFacebook = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFacebook(event.target.value);
    };
    
    return(
    <div className="editProfileWrapper">
        <div className="editProfileContainer">
        <div className="editProfileInfo">
            <div className="profilePicutre">
                <Image src={profilePicture} alt="profile-picture" />
            </div>
            <div className="editInputContainer">
            <label htmlFor="name">Name:</label>
            <input 
                id="name" 
                type="text" 
                placeholder="Name"
                value={fullName} 
                onChange={handleFullName} 
            />
        </div>
        <div className="editTextareaContainer">
            <label htmlFor="bio">Bio:</label>
            <textarea 
                id="bio" 
                placeholder="bio"
                value={bio} 
                onChange={handleChangeBio} 
            />
        </div>
            <p>@{user.username}</p>
            <div className="profileSocialMediaContainer">
                <Image src={instagramImg} alt="instagram" />
                <Image src={xImg} alt="x" />
                <Image src={tiktokImg} alt="tiktok" />
                <Image src={youtubeImg} alt="youtube" />
                <Image src={facebookImg} alt="facebook" />
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
                onChange={handleInstagram} 
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
                onChange={handleX} 
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
                onChange={handleTiktok} 
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
                onChange={handleYoutube} 
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
                onChange={handleFacebook} 
            />
        </div>
    </div>
        </div>
        <div>
        </div>
        </div>
    </div>
    )
}