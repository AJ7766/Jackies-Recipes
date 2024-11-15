import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Types } from "mongoose";
import { UserPopulatedRecipePopulatedProps } from "@/models/UserModel";

interface RecipeCardProps {
  id: Types.ObjectId | undefined;
  title: string;
  image: string | string;
}

function MasonaryProfileComponent({
  profile,
  columns = null,
  canEdit
}: {
  profile: UserPopulatedRecipePopulatedProps | null;
  columns: RecipeCardProps[][] | null;
  canEdit: boolean;
}) {
  return (
    <>
    {columns && columns.length > 0 && (
        <div className="masonryContainer">
          {columns.map((column, columnIndex) => (
            <div className="masonryColumn" key={columnIndex}>
              {column.map((recipe, recipeIndex) => (
                <React.Fragment key={recipeIndex}>
                  <Link
                    href={`/${profile?.username}/${recipe.id}`}
                    scroll={false}
                  >
                    <div className="masonryImg">
                      <Image
                        width={500}
                        height={500}
                        src={recipe.image || ""}
                        alt={recipe.title}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <div className="recipeSettingsContainer">
                    <Link
                      href={`/${profile?.username}/${recipe.id}`}
                      scroll={false}
                    >
                      <h1>{recipe.title}</h1>
                    </Link>
                    {canEdit && (
                      <Link href={`/edit-recipe/${recipe.id}`}>
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
  );
}

export default React.memo(MasonaryProfileComponent);
