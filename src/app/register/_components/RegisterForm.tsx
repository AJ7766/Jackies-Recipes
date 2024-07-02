import Link from "next/link";

export default function RegisterForm(){
    return (
        <div className="registerFormContainer">
          <h1 className="registerText">Register</h1>
        <form className="registerForm" action="/action_page.php">
          <input className="mb-5" type="text" id="email" name="email" placeholder="Email" />
          <input className="mb-5" type="text" id="fname" name="fname" placeholder="Full Name" />
          <input className="mb-5" type="text" id="username" name="username" placeholder="Username" />
          <input className="mb-5" type="password" id="password" name="password" placeholder="Password" />


          <button type="submit" className="blueBtn">
            Register
          </button>

          <Link href="/">
          <button className="redBtn">
            Back
          </button>
          </Link>
        </form>
      </div>
    );
}