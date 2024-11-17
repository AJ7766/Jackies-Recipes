"use client";

import Image from "next/image";
import Link from "next/link";
const usernameImg = "/images/register/username.svg";
const passwordImg = "/images/register/password.svg";
const logo = "/images/logo.png";

interface LoginFormProps {
  user: {
    username: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  loadingBtn: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginComponent({
  user = {username: "", password: ""},
  handleInputChange,
  message,
  loadingBtn,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="startingPageBg" data-testid="starting-page-bg">
      <div className="loginFormContainer">
        <div className="loginHeaderContainer">
          <Image
            className="loginLogo"
            src={logo}
            width={150}
            height={150}
            alt="logo"
            priority
          />
        </div>
        <div className="h-10 flex items-center px-9">
          {message ? (
            <p className="loginTextMessage text-gray-500 text-center">
              {message}
            </p>
          ) : (
            <p className="text-white text-center">&nbsp;</p>
          )}
        </div>
        <form
          className="loginForm flex flex-col"
          data-testid="login-form"
          onSubmit={onSubmit}
        >
          <div className="inputsContainer">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleInputChange}
                autoComplete="username"
              />
              <Image src={usernameImg} width={20} height={20} alt="username" />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleInputChange}
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
