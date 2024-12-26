"use client"
import { useState } from "react";
import { fetchRegisterAPI } from "../services/fetchRegisterAPI";
import { UserRegisterProps } from "@/_types/UserTypes";
import RegisterFormComponent from "../components/RegisterFormComponent";

export default function RegisterPage() {
  const [user, setUser] = useState<UserRegisterProps>({
    isChecked: false,
    email: "",
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: !prevUser.isChecked,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingBtn(true);
    const { message } = await fetchRegisterAPI(user);
    if (message) setMessage(message);
    setLoadingBtn(false);
  };

  return <RegisterFormComponent user={user} message={message} loadingBtn={loadingBtn} handleInputChange={handleInputChange} onSubmit={onSubmit}/>
}
