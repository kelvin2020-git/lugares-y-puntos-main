import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterAccount } from "../components/auth/RegisterAccount";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="/auth/login" element={<LoginScreen />} />

          <Route path="/auth/register" element={<RegisterAccount />} />
        </Routes>
      </div>
    </div>
  );
};
