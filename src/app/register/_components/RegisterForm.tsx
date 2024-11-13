"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRefContext } from "@/app/layout";
import { RegisterFormProps } from "@/models/UserModel";
const emailImg = "/images/register/email.svg";
const usernameImg = "/images/register/username.svg";
const fullNameImg = "/images/register/fullName.svg";
const passwordImg = "/images/register/password.svg";
const passwordConfirmImg = "/images/register/passwordConfirm.svg";
const logo = "/images/logo.png";

export default function RegisterForm() {
  const [user, setUser] = useState<RegisterFormProps>({
    isChecked: false,
    email: "",
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [successBoolean, setSuccessBoolean] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const ref = useRefContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: !user.isChecked,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);

    try {
      let res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(user),
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
              name="email"
              placeholder="Email"
              value={user.email}
              autoComplete="email"
              onChange={handleInputChange}
            />
            <Image src={emailImg} width={20} height={20} alt="email" />
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              autoComplete="username"
              onChange={handleInputChange}
            />
            <Image src={usernameImg} width={20} height={20} alt="username" />
          </div>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              autoComplete="name"
              value={user.fullName}
              onChange={handleInputChange}
            />
            <Image src={fullNameImg} width={20} height={20} alt="full-name" />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <Image src={passwordImg} width={20} height={20} alt="password" />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleInputChange}
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
            name="isChecked"
            className="mr-0.5"
            type="checkbox"
            checked={user.isChecked}
            onChange={handleInputChange}
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
