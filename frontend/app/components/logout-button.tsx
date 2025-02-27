"use client";

import React from "react";
import { IconButton } from "./button";
import LogoutIcon from "../icons/logout.svg";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <IconButton
      icon={<LogoutIcon />}
      bordered
      onClick={handleLogout}
      title="Logout"
    />
  );
} 
