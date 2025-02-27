import React, { useState, useEffect } from "react";
import styles from "./login.module.scss";
import { IconButton } from "./button";
import LoadingIcon from "../icons/three-dots.svg";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 检查是否已登录
    const isLoggedIn = document.cookie.includes('auth_token=');
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        // 登录成功，设置cookie并重定向
        document.cookie = "auth_token=authenticated; path=/; max-age=86400"; // 24小时有效
        window.location.href = "/"; // 直接跳转，让中间件处理
      } else {
        // 登录失败
        setErrorMsg("Invalid username or password");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <h1 className={styles["login-title"]}>Login</h1>
        
        {errorMsg && <div className={styles["error-message"]}>{errorMsg}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className={styles["login-button"]}>
            <IconButton 
              icon={isLoading ? <LoadingIcon /> : null}
              text={isLoading ? "Logging in..." : "Login"}
              type="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
} 
