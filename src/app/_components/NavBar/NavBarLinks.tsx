"use client"
import { activeLink } from "@/app/_services/navBarServices"

export const ProfileBtn = ({ username }: { username: string }) => {
    return <h2 className={`${activeLink(`/${username}`)} hidden md:block`}>Profile</h2>
}


export const HomeBtn = () => {
    return <h2 className={`${activeLink("/")} hidden md:block`}>Home</h2>

}

export const AddRecipeBtn = () => {
    return <h2 className={`${activeLink(`/add-recipe`)} hidden md:block`}>Add Recipe</h2>
}

