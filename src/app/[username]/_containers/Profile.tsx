"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";

export default function Profile({ serverProfile }: { serverProfile: UserPopulatedRecipePopulatedProps }) {

    return <ProfileComponent profile={serverProfile} />
}