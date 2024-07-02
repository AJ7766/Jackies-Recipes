'use client'
import Link from "next/link";
import { useState } from "react";
import { getPosts } from "../../../../_actions/postActions";
import { createUser } from "../../../../_actions/createAccount";

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      
  } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle errors appropriately
  }
};
  // Log all state variables whenever any of them change
  console.log('email:', email);
  console.log('fullName:', fullName);
  console.log('userName:', userName);
  console.log('password:', password);
  console.log('error:', error);

  return (
      <div className="registerFormContainer">
          <h1 className="registerText">Register</h1>
          {error && <p className="error">{error}</p>}
          <form className="registerForm" onSubmit={handleSubmit}>
              <input
                  className="mb-5"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <input
                  className="mb-5"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
              />
              <input
                  className="mb-5"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
              />
              <input
                  className="mb-5"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <input
                  className="mb-5"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="blueBtn">
                  Register
              </button>

              <Link href="/">
                  <button className="redBtn">Back</button>
              </Link>
          </form>
      </div>
  );
}