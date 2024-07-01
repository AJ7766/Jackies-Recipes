import Image from "next/image";
import Link from "next/link";
import forgotPasswordImg from '@/app/images/forgotPassword.svg'

export default function ForgotPassForm(){
    return (
        <div className="forgotPassFormContainer">
        <form className="forgotPassForm" action="/action_page.php">
          <Image className="m-auto max-w-100 w-9/10 pb-6" src={forgotPasswordImg} alt="forgot-password"/>
          <p>Please enter your email.</p>
          <input className="mb-5" type="text" id="email" name="email" placeholder="Email" />

          <button type="submit" className="text-xl tracking-widest bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-1">
            Send
          </button>
          <Link href="/">
          <button className="text-xl tracking-widest bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            Back
          </button>
          </Link>
        </form>
      </div>
    );
}