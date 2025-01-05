import dynamic from "next/dynamic";
const SearchComponent = dynamic(() => import("../SearchComponent"), { ssr: true });
import Link from "next/link";
import Image from "next/image";
import { NavSearch } from "../../_containers/NavSearch";
import { Dropdown } from "../../_containers/Dropdown";
import { getSession } from "@/_utils/session";
import { AddRecipeBtn, HomeBtn, ProfileBtn } from "./NavBarLinks";
import { getUserController } from "@/app/_ssr/user/userController";
const logo = "https://res.cloudinary.com/denumkkcx/image/upload/v1734112468/logo-text-free_c6hbgq.webp";
const searchGlass = "/images/icons/search.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";
const home = "/images/icons/home.svg";
const addRecipe = "/images/icons/add-recipe.svg";

export async function NavBar() {
  const session = await getSession();
  const user = await getUserController(session.user_id);

  return <>
    <SearchComponent />
      <div className="navContainer">
        <Link
          className="hidden md:block"
          href={"/"}
          prefetch={false}>
          <div className="navBarLogoComponent">
            <Image
              src={logo}
              alt="logo"
              width={40}
              height={40}
              fetchPriority="high"
            />
            <h2>Jackies Recipes</h2>
          </div>
        </Link>
        <Link
          className="navBarComponent"
          href={`/`}
          prefetch={false}
        >
          <Image
            className="home"
            height={30}
            width={30}
            src={home}
            alt="home-page"
          />
          <HomeBtn />
        </Link>
        <div className="navBarComponent searchMobileIcon grid md:hidden">
          <Image
            src={searchGlass}
            id="searchGlass"
            alt="search-glass"
            width={30}
            height={30}
          />
        </div>
        <NavSearch />
        {user ? (
          <>
            <Link
              className="navBarComponent"
              href={`/${user.username}`}
              prefetch={false}
            >
              <Image
                className="profilePicture"
                height={30}
                width={30}
                src={user.userContent?.profilePicture || profilePicture}
                alt="profile-picture"
                sizes='100px'
              />
              <ProfileBtn username={user.username} />
            </Link>
            <Link className="navBarComponent" href="/add-recipe" prefetch={false}>
              <Image
                height={30}
                width={30}
                src={addRecipe}
                alt="add-recipe"
              />
              <AddRecipeBtn />
            </Link>
            <Dropdown />
          </>
        ) :
          <div className="flex flex-row gap-[6px] md:flex-col">
            <Link href="/" prefetch={false}>
              <button className="bg-black p-[5px_clamp(7px,_2vw,_20px)] rounded-[5px] text-white w-[30vw] md:w-full">Login</button>
            </Link>
            <Link href="/register" prefetch={false}>
              <button className="bg-[#ef4444] p-[5px_clamp(7px,_2vw,_20px)] rounded-[5px] text-white w-[30vw] md:w-full">Register</button>
            </Link>
            <p className="hidden md:block">Make sure to login to get access to all features!<br /><br />This app is in development mode right now, feel free to login with recruiter:recruiter if you don't want to create an account</p>
          </div>
        }
      </div >
    </>
}
