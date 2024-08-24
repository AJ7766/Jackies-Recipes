"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from "../context/AuthContext";

const usernameImg = "/images/register/username.svg";
const passwordImg = "/images/register/password.svg";
const logo = "/images/logo.png";

export default function LoginForm(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingBtn(true);
        try {
          let res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (!res.ok) {
            const errorResponse = await res.json();
            const errorMessage = errorResponse.message || "Failed to login."
            setError(true);
            setErrorMsg(errorMessage);
            throw new Error(errorMessage);
          } 
          else if(res.ok){
            setError(false);
            let data = await res.json();
            login(data.token);
            router.push(`/${username}`);
          }}catch (error:any) {
          console.error("Error:", error);
        }finally{
          setLoadingBtn(false);
        }
      };
      
    return (
      <div className="startingPageBg">
        <div className="loginFormContainer">
          <div className="loginHeaderContainer">
        <Image className="loginLogo" src={logo} width={150} height={150} alt="logo" />
        </div>
        <div className="h-10 flex items-center px-9">        
          {error ? <p className="loginTextMessage text-gray-500 text-center">{errorMsg}</p> : <p className="text-white text-center">&nbsp;</p>}
        </div>
        <form className="loginForm flex flex-col" onSubmit={handleSubmit}>
        <div className="inputsContainer">
            <div>
              <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
              />
              <Image src={usernameImg} width={20} height={20} alt="username"/>
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
              <Image src={passwordImg} width={20} height={20} alt="password"/>
              </div>
          </div>
          <div className="buttonsContainer">
          <button type="submit" className={`blackBtn ${loadingBtn ? "blueBtnLoading" : ''}`} disabled={loadingBtn}>
            {loadingBtn ? "Logging in..." : "Login"}
              </button>
              <Link href="/register" prefetch>
                  <button className="redBtn">Register</button>
              </Link>
              </div>
        </form>
      </div>
      </div>
    );
}