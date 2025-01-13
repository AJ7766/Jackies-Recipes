"use client"
import { RecipeProps } from "@/_types/RecipeTypes";
import { useSelectedRecipe } from "@/_context/SelectedRecipeContext";
import { CldImage } from "next-cloudinary"
import Link from "next/link";
import { UserProps } from "@/_types/UserTypes";
import Image from "next/image";
const profilePicture = '/images/profilePicture.png';

export const RecipeCard = ({
    recipe,
    profile,
    ownProfile
}: {
    recipe: RecipeProps,
    profile: UserProps,
    ownProfile?: boolean
}) => {
    const { selectedRecipeHandler } = useSelectedRecipe();
    return (
        <>
            <CldImage
                src={recipe.image || ""}
                onClick={() => selectedRecipeHandler(recipe, profile)}
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
                    onClick={() => selectedRecipeHandler(recipe, profile)}>
                    {recipe.title}
                </h1>
                <Link href={`${profile.username}`} prefetch={false}> <p className="text-center text-gray-500">@{profile.username}</p></Link>
                <div className='recipe-profile-picture-container'>
                    <CldImage
                        width={50}
                        height={50}
                        src={profile.userContent?.profilePicture || profilePicture}
                        alt={`${profile.username} profile picture`}
                        className="recipe-profile-picture"
                        loading="lazy"
                    />
                    <div className='recipe-profile-image-pseudo'></div>
                </div>
                {ownProfile &&
                    <Link href={`/edit-recipe/${recipe._id}`} prefetch={false}>
                        <Image
                            src={'/images/icons/cogwheel.svg'}
                            width={16}
                            height={16}
                            className="edit-img"
                            alt="edit"
                        />
                    </Link>
                }
            </div>
        </>
    )
}