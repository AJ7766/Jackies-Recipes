"use client"
import { useState } from "react";
import { fetchLoginAPI } from "../_services/api/fetchLoginAPI";
import LoginFormComponent from "../_components/LoginComponent";

export default function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingBtn(true);

    const { message, success } = await fetchLoginAPI(
      user.username,
      user.password
    );
    if (!success) {
      setMessage(message);
      setLoadingBtn(false);
      return
    }
    window.location.href = `/${user.username}`;
    setMessage(message);
    setLoadingBtn(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <LoginFormComponent
      user={user}
      handleInputChange={handleInputChange}
      message={message}
      loadingBtn={loadingBtn}
      onSubmit={onSubmit}
    />
  );
}
