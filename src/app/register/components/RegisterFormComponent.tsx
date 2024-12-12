import { UserRegisterProps } from "@/_models/UserModel";
import Image from "next/image";
import Link from "next/link";
const emailImg = "/images/register/email.svg";
const usernameImg = "/images/register/username.svg";
const fullNameImg = "/images/register/fullName.svg";
const passwordImg = "/images/register/password.svg";
const passwordConfirmImg = "/images/register/passwordConfirm.svg";
const logo = "/images/logo.webp";

interface RegisterFormProps {
  user: UserRegisterProps;
  message: string;
  loadingBtn: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function RegisterFormComponent({
  user,
  handleInputChange,
  message,
  loadingBtn,
  onSubmit,
}: RegisterFormProps) {
  return (
    <div className="startingPageBg">
      <div className="registerFormContainer">
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
          {message ? (
            <p className="loginTextMessage text-gray-500 text-center">
              {message}
            </p>
          ) : (
            <p className="text-white text-center">&nbsp;</p>
          )}
        </div>
        <form
          className="registerForm"
          data-testid="register-form"
          onSubmit={onSubmit}
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
    </div>
  );
}
