"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

const usernameImg = "/images/register/username.svg";
const passwordImg = "/images/register/password.svg";
const logo = "/images/logo.png";

export default function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  useLayoutEffect(() => {
    const navContainer = document.querySelector(".navContainer");
    if (navContainer) {
      navContainer.remove();
    }

    const spaceElement = document.querySelector(".space");
    if (spaceElement) {
      spaceElement.remove();
    }
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    try {
      let res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        const errorMessage = data.message || "Failed to login.";
        console.log(errorMessage)
        setError(true);
        setErrorMsg(errorMessage);
        throw new Error(errorMessage);
      }
      setError(false);
      let data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = `/${username}`;
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login.";
      setErrorMsg(errorMessage);
      setError(true);
    } finally {
      setLoadingBtn(false);
    }
  };

  return(
    <div className="startingPageBg" data-testid="starting-page-bg">
      <div className="loginFormContainer">
        <div className="loginHeaderContainer">
          <Image
            className="loginLogo"
            src={logo}
            width={150}
            height={150}
            alt="logo"
          />
        </div>
        <div className="h-10 flex items-center px-9">
          {error ? (
            <p className="loginTextMessage text-gray-500 text-center">
              {errorMsg}
            </p>
          ) : (
            <p className="text-white text-center">&nbsp;</p>
          )}
        </div>
        <form
          className="loginForm flex flex-col"
          data-testid="login-form"
          onSubmit={handleSubmit}
        >
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
              <Image src={usernameImg} width={20} height={20} alt="username" />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Image src={passwordImg} width={20} height={20} alt="password" />
            </div>
          </div>
          <div className="buttonsContainer">
            <button
              type="submit"
              className={`blackBtn ${loadingBtn ? "blueBtnLoading" : ""}`}
              disabled={loadingBtn}
            >
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
