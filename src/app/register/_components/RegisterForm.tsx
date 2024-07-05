'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import emailImg from "@/app/images/register/email.svg";
import usernameImg from "@/app/images/register/username.svg";
import fullNameImg from "@/app/images/register/fullName.svg";
import passwordImg from "@/app/images/register/password.svg";
import passwordConfirmImg from "@/app/images/register/passwordConfirm.svg";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorBoolean, setErrorBoolean] = useState(false);
  const [success, setSuccess] = useState('');
  const [successBoolean, setSuccessBoolean] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);


  
  const isValidEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z]+$/;
    if(!usernameRegex.test(username)){
      const errorMsg = "Username can only contain letters."
      return errorMsg
    }
    if(username.length < 4){
      const errorMsg = "Username must be atleast 4 letters."
      return errorMsg;
    }else{
      return null
    }
  };

  const isValidPassword = (password:string, confirmPassword: string) => {
    if(password.length < 6){
      const errorMsg = "Password must be atleast 6 characters."
      return errorMsg
    }
    if(password !== confirmPassword){
      const errorMsg = "Passwords do not match."
      return errorMsg;
    }
    return null
  }

  function validationSchema( ){

    if (!email || !fullName || !username || !password || !confirmPassword) {
      setErrorBoolean(true);
      setError("Please fill out all fields.");
      return false;
    }
    
    if (!isValidEmail(email)) {
      setErrorBoolean(true);
      setError("Please enter a valid Email address.");
      return false;
    }

    const userNameValid = isValidUsername(username)
    if (userNameValid) {
      setErrorBoolean(true);
      setError(userNameValid);
      return false;
    }
    
    const userPasswordValid = isValidPassword(password, confirmPassword)
    if (userPasswordValid) {
      setErrorBoolean(true);
      setError(userPasswordValid);
      return false;
    }

    setErrorBoolean(false);
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    const isValid = validationSchema();
    if (!isValid) {
      setLoadingBtn(false);
      setSuccessBoolean(false);
      return;
    }

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, username, fullName, password }),
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
        <div className="registerTextContainer">
          <h1 className="registerText">Register</h1>
          {errorBoolean && <p className="errorText">{error}</p>}
          {successBoolean && <p className="successText">{success}</p>}
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
                  onChange={(e) => setUserName(e.target.value)}
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
              <button type="submit" className={`blueBtn ${loadingBtn ? "blueBtnLoading" : ''}`} disabled={loadingBtn}>
            {loadingBtn ? "Registering..." : "Register"}
              </button>
              <Link href="/">
                  <button className="redBtn">Back</button>
              </Link>
              </div>
          </form>
      </div>
  );
}