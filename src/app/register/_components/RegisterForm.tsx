'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailImg from "@/app/images/register/email.svg";
import usernameImg from "@/app/images/register/username.svg";
import fullNameImg from "@/app/images/register/fullName.svg";
import passwordImg from "@/app/images/register/password.svg";
import passwordConfirmImg from "@/app/images/register/passwordConfirm.svg";
import logo from "@/app/images/logo.png";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorBoolean, setErrorBoolean] = useState(false);
  const [success, setSuccess] = useState('');
  const [successBoolean, setSuccessBoolean] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    
    try {
      let res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, username, fullName, password, confirmPassword }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        setSuccessBoolean(false);
        setErrorBoolean(true);
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to register.");
      } 
      else if(res.ok){
        setErrorBoolean(false);
        setSuccessBoolean(true);
        let successResponse = await res.json();
        console.log("Registration successful:", successResponse);
        setSuccess(successResponse.message);
      }}catch (error:any) {
      console.log(success);
      console.error("Error:", error);
      setError(error.message || "Failed to register.");
    }finally{
      setLoadingBtn(false);
    }
  };
  return (
      <div className="registerFormContainer">
          <div className="loginHeaderContainer">
          <Image  className="loginLogo" src={logo} alt="logo"/>
          </div>
          <div className="h-14 flex items-center px-9">        
          {errorBoolean ? <p className="loginTextMessage text-gray-500 text-center">{error}</p> : <p className="text-white text-center">&nbsp;</p>} 
          {successBoolean ? <p className="loginTextMessage text-green-500 text-center">{success}</p>: <p className="text-white text-center">&nbsp;</p>}
          </div>
          <form className="registerForm" onSubmit={handleSubmit}>
            <div className="inputsContainer">
            <div>
              <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <Image src={emailImg} alt="email"/>
              </div>
              <div>
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <Image src={usernameImg} alt="username"/>
              </div>
              <div>
              <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
              />
              <Image src={fullNameImg} alt="full-name"/>
              </div>
              <div>
              <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <Image src={passwordImg} alt="password"/>
              </div>
              <div>
              <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Image src={passwordConfirmImg} alt="passwordConfirm"/>
              </div>
              </div>
              <div className="buttonsContainer">
              <button type="submit" className={`blackBtn ${loadingBtn ? "blackBtn" : ''}`} disabled={loadingBtn}>
            {loadingBtn ? "Registering..." : "Register"}
              </button>
              <Link href="/" prefetch>
                  <button className="redBtn">Back</button>
              </Link>
              </div>
          </form>
      </div>
  );
}