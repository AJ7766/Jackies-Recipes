import Link from "next/link";

export default function LoginForm(){
    return (
        <div className="loginFormContainer">
        <h1 className="loginText">LOGIN</h1>

        <form className="loginForm flex flex-col" action="/action_page.php">
        <div className="mb-7 w-full">
          <input className="mb-5 w-full" type="text" id="email" name="email" placeholder="Email or Username" />
          <input className="w-full" type="password" id="password" name="password" placeholder="Password"/>
          <Link href="/forgot-password">
          <p className="w-full text-white hover:underline hover:text-gray-400 block">Forgot your password?</p>
          </Link>
          </div>

          <button type="submit" className="blueBtn">
            Login
          </button>
          <Link href="/register">
          <button className="redBtn">
            Register
          </button>
          </Link>
        </form>
      </div>
    );
}