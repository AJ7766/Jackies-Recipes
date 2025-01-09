"use client"
import { fetchLoginAPI } from "@/server/api/fetchLoginAPI";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const usernameImg = "/images/register/username.svg";
const passwordImg = "/images/register/password.svg";

export const Loginform = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingBtn(true);

        const { message, fetchedUser } = await fetchLoginAPI(
            user.username,
            user.password
        );
        if (!fetchedUser) {
            setMessage(message);
            setLoadingBtn(false);
            return
        }
        setMessage(message);
        setLoadingBtn(false);
        router.push(`/${fetchedUser.username}`);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <>
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
                    <Link href="/register" prefetch={false}>
                        <button className="redBtn">Register</button>
                    </Link>
                </div>
            </form>

        </>
    )
}