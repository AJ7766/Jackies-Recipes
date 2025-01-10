"use client"
import { RecipeProps } from "@/_types/RecipeTypes";
import { useSelectedRecipe } from "@/_context/SelectedRecipeContext";
import { CldImage } from "next-cloudinary"
import Link from "next/link";
const profilePicture = '/images/profilePicture.png';

export const RecipeCard = ({ recipe }: { recipe: RecipeProps }) => {
    const { selectedRecipeHandler } = useSelectedRecipe();
    return (
        <>
            <CldImage
                src={recipe.image || ""}
                onClick={() => selectedRecipeHandler(recipe)}
                alt={recipe.title}
                crop='limit'
                width={1280}
                height={1280}
                className="recipe-img"
                fetchPriority="high"
                loading="lazy"
                sizes="(max-width: 768px) 33vw, 500px"
                format="webp"
            />
            <div className='recipe-info-container'>
                <h1
                    className='recipe-title cursor-pointer'
                    onClick={() => selectedRecipeHandler(recipe)}>
                    {recipe.title}
                </h1>
                <Link href={`${recipe.user.username}`} prefetch={false}> <p className="text-center text-gray-500">@{recipe.user.username}</p></Link>
                <div className='recipe-profile-picture-container'>
                    <CldImage
                        width={50}
                        height={50}
                        src={recipe.user.userContent?.profilePicture || profilePicture}
                        alt={`${recipe.user.username} profile picture`}
                        className="recipe-profile-picture"
                        loading="lazy"
                    />
                    <div className='recipe-profile-image-pseudo'></div>
                </div>
            </div>
        </>
    )
}