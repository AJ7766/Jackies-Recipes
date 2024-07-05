import Image from "next/image";
import Link from "next/link";
import usernameImg from "@/app/images/register/username.svg";
import passwordImg from "@/app/images/register/password.svg";

export default function LoginForm(){
    return (
        <div className="loginFormContainer">
        <h1 className="loginText">LOGIN</h1>

        <form className="loginForm flex flex-col" action="/action_page.php">
        <div className="inputsContainer">
            <div>
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
              />
              <Image src={usernameImg} alt="username"/>
              </div>
              <div>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
              />
              <Link href="/forgot-password">
          <p className="w-full h-0 ml-1 text-white hover:underline hover:text-gray-400 block">Forgot your password?</p>
          </Link>
              <Image src={passwordImg} alt="password"/>
              </div>
          </div>
          <div className="buttonsContainer">
              <button type="submit" className="blueBtn">
                  Login
              </button>
              <Link href="/register">
                  <button className="redBtn">Register</button>
              </Link>
              </div>
        </form>
      </div>
    );
}