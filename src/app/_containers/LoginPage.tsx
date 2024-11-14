import { useState } from "react";
import { fetchLoginAPI } from "../_services/fetchLoginAPI";
import LoginFormComponent from "../_components/LoginFormComponent";

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

    const { message, token } = await fetchLoginAPI(
      user.username,
      user.password
    );

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = `/${user.username}`;
    }

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
