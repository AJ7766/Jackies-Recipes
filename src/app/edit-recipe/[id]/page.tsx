"use client"

import ErrorPage from "@/app/_components/ErrorPage";
import NavBar from "@/app/_components/NavBar";
import { useAuth } from "@/app/context/AuthContext";
import { ProfileProps } from "@/app/types/types";
import EditRecipeForm from "../_components/editRecipeForm";
import { useEffect, useState } from "react";
import { SimplifiedRecipeProps } from "@/models/UserRecipe";

export default function EditRecipePage({params}: {params: {id: string}}){
    const { id } = params;
    const { user, initializing } = useAuth();
    const [verifiedRecipe, setVerifiedRecipe] = useState<SimplifiedRecipeProps | null>(null);
    const [loading, setLaoding] = useState(true);

    useEffect(() => {
        if(initializing){
            return;
        }
        const fetchRecipe = async () => {
            if (user) {
                console.log(user)
                const results = await verifyRecipe(id, user);
                if(results){
                    setVerifiedRecipe(results);
                }
                else {
                    setVerifiedRecipe(null);
                }
            }setLaoding(false);
        }
        fetchRecipe();
    }, [initializing, id, user, setVerifiedRecipe]);

    if(loading || verifiedRecipe == null){
        return <div>loading...</div>
    }

    if (!user) {
        console.log("error")
        return <ErrorPage />;
    }

    return(
        <>
        <NavBar />
        <EditRecipeForm recipeEdit={verifiedRecipe}/>
        </>
    )
}

async function verifyRecipe(id: string, user: ProfileProps) {
    if (user?.recipes) {
        for (const recipe of user.recipes) {
            if(recipe._id?.toString() === id){
                return recipe;
            }
        }
    }
    return false;
}