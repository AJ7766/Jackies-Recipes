"use client"

import Image from "next/image";
import Link from "next/link";
import usernameImg from "@/app/images/register/username.svg";
import passwordImg from "@/app/images/register/password.svg";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useAuth } from "../context/AuthContext";

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
          <div>
        <h1 className="loginText">LOGIN</h1>
        {error ? <p className="-mt-3 -mb-5 text-white text-center">{errorMsg}</p> : <p className="-mt-3 -mb-5 text-white text-center">&nbsp;</p>}
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
              <Image src={usernameImg} alt="username"/>
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
              <Link href="/forgot-password" prefetch>
          <p className="w-full h-0 ml-1 text-white hover:underline hover:text-gray-400 block">Forgot your password?</p>
          </Link>
              <Image src={passwordImg} alt="password"/>
              </div>
          </div>
          <div className="buttonsContainer">
          <button type="submit" className={`blueBtn ${loadingBtn ? "blueBtnLoading" : ''}`} disabled={loadingBtn}>
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