import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://skilllinkr.ngarikev.tech/api/auth/whoami",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          const refreshToken = localStorage.getItem("refresh");
          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const refreshResponse = await fetch(
            "https://skilllinkr.ngarikev.tech/api/auth/refresh",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          if (!refreshResponse.ok) {
            throw new Error("Refresh failed");
          }

          const { access_token } = await refreshResponse.json();
          localStorage.setItem("access", access_token);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      {children}
      <Chat />;
    </>
  );
};

export default AuthWrapper;
