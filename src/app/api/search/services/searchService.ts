import { NextRequest } from "next/server";
import { getSearchedRecipes, getSearchedUsers } from "../repositories/searchRepository";

export const getSearchFromUrlService = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    if (!search)
        throw new Error("Couldn't get search from URL");

    return search;
}

export const getSearchedUsersService = async (search: string) =>{
    const users = getSearchedUsers(search);

    if(!users)
        console.error("No users found");

    return users;
}

export const getSearchedRecipesService = async (search: string) =>{
    const recipes = getSearchedRecipes(search);

    if(!recipes)
        console.error("No recipes found");

    return recipes;
}