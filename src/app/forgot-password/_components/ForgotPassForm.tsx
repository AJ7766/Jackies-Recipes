import Link from "next/link";
import emailImg from "@/app/images/register/email.svg";
import Image from "next/image";

export default function ForgotPassForm(){
    return (
      <div className="startingPageBg">
        <div className="forgotPassFormContainer">
          <h1 className="forgotPasswordText">Forgot Password</h1>
        <form className="forgotPassForm" action="/action_page.php">
        <div className="inputsContainer">
            <div>
              <p className="ml-1 text-white h-0">Please enter your Email Address.</p>
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
              />
              <Image src={emailImg} alt="email"/>
              </div>
            </div>
            <div className="buttonsContainer">
              <button type="submit" className="blueBtn">
                  Send
              </button>
              <Link href="/" prefetch>
                  <button className="redBtn">Back</button>
              </Link>
              </div>
        </form>
      </div>
      </div>
    );
}