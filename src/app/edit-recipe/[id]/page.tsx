"use client"

import ErrorPage from "@/app/_components/ErrorPage";
import { useAuth } from "@/app/context/AuthContext";

export default function editRecipePage({params}: {params: {id: string}}){
    const { id } = params;
    const { user } = useAuth();

    if (!user) {
        const errorPage = ErrorPage();
        return errorPage;
    }
    console.log(id)
}