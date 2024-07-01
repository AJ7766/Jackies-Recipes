import Link from "next/link";

export default function LoginForm(){
    return (
        <div className="loginFormContainer">
        <h1 className="loginText">LOGIN</h1>

        <form className="form flex flex-col" action="/action_page.php">
          <input className="mb-5" type="text" id="email" name="email" placeholder="Email" />

          <input type="password" id="password" name="password" placeholder="Password"/>
          <Link href="/forgot-password">
          <p className="text-white hover:underline hover:text-gray-400 mb-10 block mb-10">Forgot your password?</p>
          </Link>
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