import Image from "next/image";
import Link from "next/link";
import loginImg from '@/app/images/login.svg'

export default function LoginForm(){
    return (
        <div className="loginFormContainer">

        <form className="flex flex-col" action="/action_page.php">
          <Image className="m-auto max-w-100 w-3/5 pb-6" src={loginImg} alt="Login"/>
          <input className="mb-5" type="text" id="email" name="email" placeholder="Email" />

          <input type="password" id="password" name="password" placeholder="Password"/>
          <Link href="/forgot-password">
          <p className="text-black hover:underline hover:text-gray-700 mb-10 block mb-10">Forgot your password?</p>
          </Link>
          <button type="submit" className="text-xl tracking-widest bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-1">
            Login
          </button>

          <Link href="/register">
          <button className="text-xl tracking-widest bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            Register
          </button>
          </Link>
        </form>
      </div>
    );
}