import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Types } from "mongoose";
import { CldImage } from "next-cloudinary";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
}

export const MasonaryProfileComponent = React.memo(({
  username,
  columns = null,
  canEdit
}: {
  username: string;
  columns: RecipeCardProps[][] | null;
  canEdit: boolean;
}) => {
  return (
    <>
      {columns && columns.length > 0 && (
        <div className="masonryContainer">
          {columns.map((column, columnIndex) => (
            <div className="masonryColumn" key={columnIndex}>
              {column.map((recipe, recipeIndex) => (
                <React.Fragment key={recipeIndex}>
                  <Link
                    href={`/${username}/${recipe.id}`}
                    scroll={false}
                    prefetch
                  >
                    <div className="masonryImg">
                      <CldImage
                        src={recipe.image || ""}
                        alt={recipe.title}
                        width={200}
                        height={200}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="recipeSettingsContainer">
                    <Link
                      href={`/${username}/${recipe.id}`}
                      scroll={false}
                      prefetch
                    >
                      <h1>{recipe.title}</h1>
                    </Link>
                    {canEdit && (
                      <Link href={`/edit-recipe/${recipe.id}`} prefetch>
                        <Image
                          src="/images/cogwheel.svg"
                          width={24}
                          height={24}
                          alt="edit"
                        />
                      </Link>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
});