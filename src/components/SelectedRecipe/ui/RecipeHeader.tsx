"use client"
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface RecipeHeaderProps {
  username: string;
  profilePicture: string;
  recipeTitle: string;
}

export const RecipeHeader = ({ username, profilePicture, recipeTitle }: RecipeHeaderProps) => (
  <div className="recipeUserContainer">
    <Link
      className="flex gap-2"
      href={`/${username}`}
      onClick={() => (document.body.style.overflow = "auto")}
    >
      <CldImage width={25} height={25} src={profilePicture} alt="profile-picture" format="webp" />
      <div>
        <h2>{username}</h2>
      </div>
    </Link>
    <h1>{recipeTitle}</h1>
  </div>
);