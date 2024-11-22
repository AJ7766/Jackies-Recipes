"use client"
import { useState } from "react";
import ProfileComponent from "../_components/ProfileComponent";
import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";

export default function Profile({serverProfile}:{serverProfile: UserPopulatedRecipePopulatedProps}) {
    
    const [profile, setProfile] = useState<UserPopulatedRecipePopulatedProps>(serverProfile);
    return <ProfileComponent profile={profile} />
}