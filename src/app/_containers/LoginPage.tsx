"use client"
import { useState } from "react";
import { fetchLoginAPI } from "../_services/api/fetchLoginAPI";
import LoginFormComponent from "../_components/LoginComponent";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter()
  const { user, handleSetUser } = useAuth();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingBtn(true);

    const { message, success, fetchedUser } = await fetchLoginAPI(
      loginUser.username,
      loginUser.password
    );
    if (!success) {
      setMessage(message);
      setLoadingBtn(false);
      return
    }
    handleSetUser(fetchedUser);
    setMessage(message);
    setLoadingBtn(false);
    router.push(`/${fetchedUser.username}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  if (user) return null;
  return (
    <LoginFormComponent
      user={loginUser}
      handleInputChange={handleInputChange}
      message={message}
      loadingBtn={loadingBtn}
      onSubmit={onSubmit}
    />
  );
}
