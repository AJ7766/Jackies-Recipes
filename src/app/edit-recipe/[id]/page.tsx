"use client"

import ErrorPage from "@/app/_components/ErrorPage";
import NavBar from "@/app/_components/NavBar";
import { useAuth } from "@/app/context/AuthContext";
import { ProfileProps } from "@/app/types/types";
import EditRecipeForm from "../_components/editRecipeForm";

export default function EditRecipePage({params}: {params: {id: string}}){
    const { id } = params;
    const { user } = useAuth();

    if (!user) {
        const errorPage = <ErrorPage />;
        return errorPage;
    }

    const verifyResults = verifyRecipe(id, user);

    if(!verifyResults){
        const errorPage = <ErrorPage />;
        return errorPage;
    }

    console.log(verifyResults);
    return(
        <>
        <NavBar />
        <EditRecipeForm recipeEdit={verifyResults}/>
        </>
    )
}

function verifyRecipe(id: string, user: ProfileProps) {
    if (user?.recipes) {
        for (const recipe of user.recipes) {
            if(recipe._id?.toString() === id){
                return recipe;
            }
        }
    }
    return false;
}