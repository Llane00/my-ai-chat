import React, { createContext, useContext, useState, useEffect } from "react";
import { Login } from "./login";

// 创建认证上下文
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// 认证提供者组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 检查初始认证状态
  useEffect(() => {
    const token = document.cookie.includes('auth_token=');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  // 登录函数
  const login = (token: string) => {
    document.cookie = `auth_token=${token}; path=/; max-age=86400`;
    setIsAuthenticated(true);
  };

  // 登出函数
  const logout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // 如果未认证，显示登录页面
  if (!isAuthenticated) {
    return <Login />;
  }

  // 已认证，渲染子组件
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 
