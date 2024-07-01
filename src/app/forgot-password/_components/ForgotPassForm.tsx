import Link from "next/link";

export default function ForgotPassForm(){
    return (
        <div className="forgotPassFormContainer">
          <h1 className="forgotPasswordText">Forgot Password</h1>
        <form className="forgotPassForm" action="/action_page.php">
          <p className="text-white">Please enter your email.</p>
          <input className="mb-5" type="text" id="email" name="email" placeholder="Email" />
          <button type="submit" className="blueBtn">
            Send
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