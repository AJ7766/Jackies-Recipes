"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import SelectedRecipe from "./containers/SelectedRecipe";

export default function Recipe() {
  const { profile } = useProfile();

  return <SelectedRecipe profile={profile}/>
}
