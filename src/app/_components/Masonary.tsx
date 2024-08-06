import Image from "next/image";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProfilePropsOrNull } from "../types/types";
import Link from "next/link";
import { Types } from "mongoose";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import cogwheel from "@/app/images/cogwheel.svg";

export default function Masonary({profile}:{profile: ProfilePropsOrNull}){     
  
  interface RecipeCardProps {
    id: Types.ObjectId | undefined,
    title: string;
    image: string | string;
  }

    const [totalColumns, setTotalColumns] = useState<number>(1);
    const [canEdit, setCanEdit] = useState(false)
    const [columns, setColumns] = useState<RecipeCardProps[][]>(() =>
      Array.from({ length: 1 }, () => [])
    );

  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(()=>{
    const fetchAuthenticated = async () => {
      const pathParts = pathname.split('/');
      const usernameLink = pathParts[pathParts.length - 1];
      if(usernameLink === user?.username){
        setCanEdit(true);
      }
    }
    fetchAuthenticated();
  })

  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    if (width > 768) {
      setTotalColumns(3);
    } else {
      setTotalColumns(2);
    }
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, [updateColumns]);

  useEffect(()=>{
    const newColumns:RecipeCardProps[][] = Array.from({ length: totalColumns }, () => []);

    profile?.recipes && profile?.recipes.map((recipe, index)=>{
      const recipeCard = {
        id: recipe._id,
        title: recipe.title,
        image: recipe.image || '',
      }
      const columnIndex = index % totalColumns;
      newColumns[columnIndex].push(recipeCard);
      setColumns(newColumns);
    })
  },[totalColumns, profile?.recipes])

    return (<>
    {columns.length > 1 ?
    <div className="masonryContainer">
    {columns.map((column, columnIndex) => (
        <div className="masonryColumn" key={columnIndex}>
          {column.map((recipe, recipeIndex) => (
            <React.Fragment key={recipeIndex}>
            <Link href={`/${profile?.username}/${recipe.id}`} scroll={false}>
            <div className="masonryImg">
              <Image width={500} height={500} src={recipe.image || ''} alt={`Image${recipeIndex}`}/>
            </div>
            </Link>
             <div className="recipeSettingsContainer">
             <Link href={`/${profile?.username}/${recipe.id}`} scroll={false}>
              <h1>{recipe.title}</h1>
              </Link>
              {canEdit &&
              <Link href={`/edit-recipe/${recipe.id}`}>
                <Image src={cogwheel} alt="edit"/>
              </Link>
              }
              </div>
              </React.Fragment>
          ))}
        </div>
      ))}
    </div>:
          <div className="noRecipesContainer">
            <h1>No recipes were found</h1>
        </div>
    }

    </>)
}