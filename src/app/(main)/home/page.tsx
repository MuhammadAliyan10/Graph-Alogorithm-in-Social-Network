"use client";
import React, { useEffect, useState } from "react";
import ShinyText from "@/components/Animated/ShinyText";
import LoginFacebook from "@/components/LoginFacebook";

const page = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLogIn(true);
    }
  });
  return (
    <div className="container my-12">
      <ShinyText
        text="Wellcome to netWiz"
        className="text-3xl lg:text-4xl font-semibold"
        disabled={false}
        speed={2}
      />
      <div className="my-6">
        <p>
          To access your data and use this app kindly login to your facebook
          platform.
        </p>
        {!isLogIn && <LoginFacebook />}
      </div>
    </div>
  );
};

export default page;
