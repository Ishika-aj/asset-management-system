import React, { useState } from "react";
import { login } from "../api/api";
import "./Login.css";
import loginImg from "../assets/login.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      // Validate response
      if (!res.data || !res.data.token || !res.data.role) {
        setError("Invalid response from server");
        return;
      }

      // Save token, username, and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (res.data.role === "EMPLOYEE") {
        window.location.href = "/employee/dashboard";
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div
          className="login-card-left"
          style={{ backgroundImage: `url(${loginImg})` }}
        >
          <div className="left-overlay">
            <div className="left-actions">
              <button className="pill active">Log In</button>
              <button className="pill">Sign Up</button>
            </div>
          </div>
        </div>

        <div className="login-card-right">
          <div className="right-inner">
            <div className="brand">
              <h1>Asset<span>Pro</span></h1>
              <p className="brand-sub">Manage assets simply</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="field">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="get-started">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
