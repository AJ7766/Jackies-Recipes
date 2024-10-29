"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRefContext } from "@/app/layout";

const emailImg = "/images/register/email.svg";
const usernameImg = "/images/register/username.svg";
const fullNameImg = "/images/register/fullName.svg";
const passwordImg = "/images/register/password.svg";
const passwordConfirmImg = "/images/register/passwordConfirm.svg";
const logo = "/images/logo.png";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [successBoolean, setSuccessBoolean] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const ref = useRefContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          isChecked,
          email,
          username,
          fullName,
          password,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        setSuccessBoolean(false);
        setError(true);
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to register.");
      }
      setError(false);
      setSuccessBoolean(true);
      let data = await res.json();
      setSuccess(data.message);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to register.";
      setErrorMsg(errorMessage);
      setError(true);
      setSuccessBoolean(false);
    } finally {
      setLoadingBtn(false);
    }
  };
  return (
    <div ref={ref} className="registerFormContainer">
      <div className="loginHeaderContainer">
        <Image
          className="loginLogo"
          src={logo}
          width={150}
          height={150}
          priority
          alt="logo"
        />
      </div>
      <div className="h-14 flex items-center px-9">
        {error ? (
          <p className="loginTextMessage text-gray-500 text-center">
            {errorMsg}
          </p>
        ) : (
          <p className="text-white text-center">&nbsp;</p>
        )}
        {successBoolean ? (
          <p className="loginTextMessage text-green-500 text-center">
            {success}
          </p>
        ) : (
          <p className="text-white text-center">&nbsp;</p>
        )}
      </div>
      <form
        className="registerForm"
        data-testid="register-form"
        onSubmit={handleSubmit}
      >
        <div className="inputsContainer">
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Image src={emailImg} width={20} height={20} alt="email" />
          </div>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Image src={usernameImg} width={20} height={20} alt="username" />
          </div>
          <div>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Full Name"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Image src={fullNameImg} width={20} height={20} alt="full-name" />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Image src={passwordImg} width={20} height={20} alt="password" />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Image
              src={passwordConfirmImg}
              width={20}
              height={20}
              alt="passwordConfirm"
            />
          </div>
        </div>
        <div>
          <input
            className="mr-0.5"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="consent">
            I have read and agree to the
            <Link
              className="text-blue-600 hover:underline"
              href="/user-account-policy"
              target="_blank"
            >
              &nbsp;User Account Policy
            </Link>
            .
          </label>
        </div>
        <div className="buttonsContainer">
          <button
            type="submit"
            className={`blackBtn ${loadingBtn ? "blackBtn" : ""}`}
            disabled={loadingBtn}
          >
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
