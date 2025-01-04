"use client";

import React, { useEffect, useState } from "react";
import ShinyText from "@/components/Animated/ShinyText";
import LoginFacebook from "@/components/LoginFacebook";
import { Check, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HomePage: React.FC = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  const checkAuthToken = () => {
    const authToken = localStorage.getItem("authToken");
    setIsLogIn(!!authToken);
  };

  useEffect(() => {
    checkAuthToken();
    const handleStorageChange = () => {
      checkAuthToken();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="m-10">
      <div className="flex flex-col justify-center h-screen ">
        <ShinyText
          text="Welcome to NetWiz"
          className="text-4xl md:text-8xl font-bold mb-4"
          disabled={false}
          speed={3}
        />
        <p className=" text-lg text-gray-600">
          Your trusted platform for connecting, sharing, and exploring. Stay
          connected with ease.
        </p>

        {!isLogIn ? (
          <div>
            <section className="my-2">
              <p className="text-gray-700 text-lg">
                To access your account and enjoy all the features of NetWiz, log
                in with your Facebook account. It's quick, secure, and easy!
              </p>
            </section>

            <div className="flex">
              <LoginFacebook />
            </div>
          </div>
        ) : (
          <>
            <section className="my-4">
              <div className="flex items-center gap-x-4">
                <Check className="text-green-500 w-6 h-6" />
                <p className="text-green-500 text-lg font-medium">
                  You are connected to Facebook.
                </p>
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
                    We collect and securely store your data to enhance your user
                    experience.
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
    </div>
  );
};

export default HomePage;
