import dynamic from "next/dynamic";
const NavSearchMobile = dynamic(() => import("./ui/NavSearchMobile"), { ssr: true });
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "./ui/Dropdown";
import { getSession } from "@/_utils/session";
import { getUserController } from "@/app/_ssr/user/userController";
import { NavSearch } from "./ui/NavSearch";
import { NavButton } from "./ui/NavButton";
const logo = "https://res.cloudinary.com/denumkkcx/image/upload/v1734112468/logo-text-free_c6hbgq.webp";
const searchGlass = "/images/icons/search.svg";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";
const home = "/images/icons/home.svg";
const addRecipe = "/images/icons/add-recipe.svg";

export async function NavBar() {
  const session = await getSession();
  const user = await getUserController(session.user_id);

  return <>
    <NavSearchMobile />
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
      <NavButton
        name={'Home'}
        href={'/'}
        className={'home'}
        image={home} />
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
          <NavButton
            name={'Profile'}
            href={`/${user.username}`}
            className={'profilePicture'}
            image={user.userContent?.profilePicture || profilePicture} />
          <NavButton
            name={'Add Recipe'}
            href={'/add-recipe'}
            image={addRecipe} />
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
