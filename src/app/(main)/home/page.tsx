"use client";

import React, { useEffect, useState } from "react";
import ShinyText from "@/components/Animated/ShinyText";
import LoginFacebook from "@/components/LoginFacebook";
import { Check, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HomePage: React.FC = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLogIn(true);
    }
  }, []);

  return (
    <div className="container my-12 px-4 ">
      <header className="text-center flex flex-col justify-center items-center">
        <ShinyText
          text="Welcome to NetWiz"
          className="text-4xl font-semibold"
          disabled={false}
          speed={2}
        />
        <p className="mt-4 text-lg text-gray-600">
          Your trusted platform for connecting, sharing, and exploring. Stay
          connected with ease.
        </p>
        <Separator className="my-6" />
      </header>

      {!isLogIn ? (
        <>
          <section className="my-10 text-center">
            <p className="text-gray-700 text-lg">
              To access your account and enjoy all the features of NetWiz, log
              in with your Facebook account. It's quick, secure, and easy!
            </p>
          </section>

          <div className="flex justify-center">
            <LoginFacebook />
          </div>
        </>
      ) : (
        <>
          <section className="my-10">
            <div className="flex items-center gap-x-4">
              <Check className="text-green-500 w-6 h-6" />
              <p className="text-green-500 text-lg font-medium">
                You are connected to Facebook.
              </p>
            </div>
            <Separator className="my-6" />
          </section>

          <section className="my-10">
            <div className="text-center">
              <ShinyText
                text="Terms & Conditions"
                className="text-3xl font-semibold"
                disabled={false}
                speed={2}
              />
              <p className="mt-4 text-gray-700">
                By logging into NetWiz, you agree to the following terms:
              </p>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  We will not share your personal data without explicit consent.
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

          <section className="my-10">
            <div className="text-center">
              <ShinyText
                text="Features of NetWiz"
                className="text-3xl font-semibold"
                disabled={false}
                speed={2}
              />
            </div>
            <Separator className="my-6" />
            <div className="space-y-6">
              <div className="flex items-center gap-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Facebook className="text-blue-500 w-6 h-6" />
                </div>
                <p className="text-gray-700">
                  <strong>Seamless Connectivity:</strong> Stay connected with
                  your Facebook friends and manage your connections
                  effortlessly.
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Check className="text-green-500 w-6 h-6" />
                </div>
                <p className="text-gray-700">
                  <strong>Secure Platform:</strong> Your data and interactions
                  are protected with the highest security standards.
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Check className="text-green-500 w-6 h-6" />
                </div>
                <p className="text-gray-700">
                  <strong>Personalized Experience:</strong> Get a tailored
                  experience based on your interests and preferences.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
