"use client";

import { initFacebookSDK } from "@/app/(main)/action";
import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";

const LoginFacebook: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initFacebookSDK().then(() => {
        console.log("Facebook SDK Initialized");
      });
    }
  }, []);

  const handleLogin = async () => {
    if (!window.FB) {
      console.error("Facebook SDK not initialized.");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise<void>((resolve, reject) => {
        window.FB.login(
          (response: any) => {
            if (response.authResponse) {
              const accessToken = response.authResponse.accessToken;
              handleTokenGeneration(accessToken);
              resolve();
            } else {
              console.error("User cancelled login or did not fully authorize.");
              setErrorMessage(
                "User cancelled login or did not fully authorize."
              );
              reject();
            }
          },
          { scope: "public_profile" }
        );
      });
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenGeneration = async (facebookToken: string) => {
    try {
      const res = await fetch("/api/auth/facebook/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facebookToken }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
      } else {
        setErrorMessage("Failed to generate token.");
      }
    } catch (error) {
      console.error("Error while generating token:", error);
      setErrorMessage("Error generating token.");
    }
  };

  return (
    <div>
      <LoadingButton
        loading={isLoading}
        onClick={handleLogin}
        className="my-6"
        type="submit"
      >
        Login with Facebook
      </LoadingButton>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default LoginFacebook;
