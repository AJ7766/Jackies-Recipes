import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import { ProfileProps } from "../types/types";
import instagram from "@/app/images/social-media/instagram.svg";
import x from "@/app/images/social-media/x.svg";
import tiktok from "@/app/images/social-media/tiktok.svg";
import youtube from "@/app/images/social-media/youtube.svg";
import facebook from "@/app/images/social-media/facebook.svg";

export default function ProfilePage(props: ProfileProps){
    const { username, fullName } = props;

    return(
    <div className="profileWrapper">
        <div className="profileContainer">
        <div className="profileInfo">
            <div className="profilePicutre">
                <Image src={profilePicture} alt="profile-picture" />
            </div>
            <h1>{fullName}</h1>
            <h2>Passionate about sharing authentic Swedish recipes. Dive into the rich flavors and traditions of Swedish cuisine. From classic dishes to modern twists, discover the heart and soul of Sweden&apos;s culinary heritage. Join me on a delicious journey!</h2>
            <p>@{username}</p>
            <div className="profileSocialMediaContainer">
                <Image src={instagram} alt="instagram" />
                <Image src={x} alt="x" />
                <Image src={tiktok} alt="tiktok" />
                <Image src={youtube} alt="youtube" />
                <Image src={facebook} alt="facebook" />

            </div>
        </div>
        <div>
        </div>
        </div>
    </div>
    )
}