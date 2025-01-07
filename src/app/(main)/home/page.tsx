"use client";

import React, { useEffect, useState } from "react";
import ShinyText from "@/components/Animated/ShinyText";
import LoginFacebook from "@/components/LoginFacebook";
import { Check, LoaderCircle } from "lucide-react";
import { useAuth } from "../AuthContext";

const HomePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isTokenValid, accessToken, accessTokenLoadingState } = useAuth();

  useEffect(() => {
    const savedUserName = localStorage.getItem("facebookUserName");

    if (savedUserName) {
      setUserName(savedUserName);
    } else if (isTokenValid) {
      fetchFacebookUserInfo();
    }
  }, [isTokenValid]);

  const fetchFacebookUserInfo = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Facebook");
      }

      const userData = await response.json();

      localStorage.setItem("facebookUserName", userData.name);
      setUserName(userData.name);
    } catch (error) {
      console.error("Error fetching user info from Facebook:", error);
      setError("Error fetching user info from Facebook");
    }
  };

  return (
    <div className="m-10">
      {accessTokenLoadingState ? (
        <div className="flex flex-col justify-center h-screen">
          <ShinyText
            text="Welcome to NetWiz"
            className="text-4xl md:text-8xl font-bold mb-4"
            disabled={false}
            speed={3}
          />
          <p className="text-lg text-gray-600">
            Your trusted platform for connecting, sharing, and exploring. Stay
            connected with ease.
          </p>

          {!accessToken ? (
            <div>
              <section className="my-2">
                <p className="text-gray-700 text-lg">
                  To access your account and enjoy all the features of NetWiz,
                  log in with your Facebook account. It's quick, secure, and
                  easy!
                </p>
              </section>
              <div className="flex">
                <LoginFacebook />
              </div>
            </div>
          ) : (
            <>
              <section className="my-4 mx-4 md:mx-0">
                <div className="flex items-center gap-x-3">
                  <Check className="text-green-500 w-6 h-6" />
                  {userName ? (
                    <p className="text-green-500 text-lg font-medium">
                      {userName}, You are connected to Facebook.
                    </p>
                  ) : error ? (
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                  ) : (
                    <p className="text-yellow-500 text-lg font-medium">
                      Loading user info...
                    </p>
                  )}
                </div>
              </section>

              <section className="my-6">
                <div>
                  <ShinyText
                    text="Terms & Conditions"
                    className="text-4xl font-bold"
                    disabled={false}
                    speed={2}
                  />
                  <p className="my-4 text-gray-700">
                    By logging into NetWiz, you agree to the following terms:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-bold">Data Collection</p>
                    <p className="mt-2 text-gray-600">
                      We collect and securely store your data to enhance your
                      user experience.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-bold">Privacy Compliance</p>
                    <p className="mt-2 text-gray-600">
                      Your account information is used in compliance with our
                      privacy policy.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-bold">Data Sharing</p>
                    <p className="mt-2 text-gray-600">
                      We will not share your personal data without explicit
                      consent.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-bold">Account Security</p>
                    <p className="mt-2 text-gray-600">
                      You are responsible for maintaining the confidentiality of
                      your credentials.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex justify-between items-center gap-x-2">
            <LoaderCircle className="animate-spin repeat-infinite text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Checking access token...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
