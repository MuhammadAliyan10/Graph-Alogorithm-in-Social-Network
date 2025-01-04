// app/page.tsx
"use client";
import { useAuth } from "@/app/(main)/AuthContext";
import ShinyText from "@/components/Animated/ShinyText";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/Global/3d-card";

const Page = () => {
  const { accessToken } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFacebookUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture,gender,birthday,age_range&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Facebook");
      }

      const data = await response.json();
      console.log(data);

      setUserData(data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching user info from Facebook:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchFacebookUserInfo(accessToken);
    }
  }, [accessToken]);

  return (
    <div className="container mx-auto my-10">
      <ShinyText
        text="About Facebook User"
        className="text-4xl md:text-5xl font-bold mb-4"
        disabled={false}
        speed={3}
      />
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}
        {userData ? (
          <div>
            <div>
              <CardContainer className="inter-var ">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-full h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between items-center gap-x-6 "
                  >
                    <img
                      src={userData.picture.data.url}
                      alt="Profile"
                      className="w-32 h-32 rounded-full "
                    />
                    <div>
                      <h2 className="text-6xl ">{userData.name}</h2>
                      <ul className="grid grid-cols-1 gap-y-2 mt-4">
                        <li>
                          Email |{" "}
                          <span className="text-muted-foreground">
                            {userData.email}
                          </span>
                        </li>
                        <li>
                          Age |{" "}
                          <span className="text-muted-foreground">
                            {userData.age_range["max"]}
                          </span>
                        </li>
                        <li>
                          Gender |{" "}
                          <span className="text-muted-foreground capitalize">
                            {userData.gender}
                          </span>
                        </li>
                        <li>
                          DOB |{" "}
                          <span className="text-muted-foreground">
                            {userData.birthday}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
