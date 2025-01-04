"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isTokenValid: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);

  const getAccessToken = async () => {
    try {
      const response = await fetch("/api/auth/facebook/getToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const checkTokenValidity = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch("/api/auth/facebook/checkToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        setIsTokenValid(false);
        setAccessToken(null); // Clear the token
        return;
      }

      const data = await response.json();
      setIsTokenValid(true);
    } catch (error) {
      console.error("Error checking token validity:", error);
      setIsTokenValid(false);
      setAccessToken(null); // Clear the token
    }
  };

  useEffect(() => {
    getAccessToken();

    // Periodically check token validity every 5 minutes
    const interval = setInterval(() => {
      checkTokenValidity();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
