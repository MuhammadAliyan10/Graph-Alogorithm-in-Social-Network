"use client";
import { useAuth } from "@/app/(main)/AuthContext";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LampComponent } from "@/components/Global/lamp";
import Link from "next/link";
import { CardStack } from "@/components/card-stack";
import { Highlight } from "@/components/Highlight";
import { LoaderCircle } from "lucide-react";

const Page = () => {
  const { accessToken } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const CARDS = [
    {
      id: 0,
      name: isLoading ? "" : userData?.name,
      designation: "About You",
      content: (
        <>
          {isLoading ? (
            "Loading..."
          ) : (
            <p>
              Your name is <Highlight>{userData?.name}</Highlight>. Your short
              name is <Highlight>{userData?.short_name}</Highlight>. Your age is{" "}
              <Highlight>{userData?.age_range?.max}</Highlight>. You are{" "}
              <Highlight>{userData?.gender}</Highlight>. Your birthday is{" "}
              <Highlight>{userData?.birthday}</Highlight>. You have total{" "}
              <Highlight>{userData?.posts?.data?.length}</Highlight>{" "}
              {userData?.posts?.data?.length > 1 ? "posts" : "post"}.
              <Highlight>{userData?.birthday}</Highlight>. You have total{" "}
              <Highlight>{userData?.friends?.summary?.total_count}</Highlight>{" "}
              {userData?.friends?.summary?.total_count > 1
                ? "friends"
                : "friend"}
              .
            </p>
          )}
        </>
      ),
    },
    {
      id: 1,
      name: isLoading ? "" : userData?.name,
      designation: "About Your Likes",
      content: (
        <>
          {isLoading ? (
            "Loading..."
          ) : (
            <p>
              You liked total
              <Highlight>{userData?.likes?.data?.length}</Highlight> pages
              including <Highlight>{userData?.music?.data?.length}</Highlight>{" "}
              music pages. Your total favorite teams are{" "}
              <Highlight>{userData?.favorite_teams?.length}</Highlight> and
              favorite athletes are{" "}
              <Highlight>{userData?.favorite_athletes?.length}</Highlight>.
            </p>
          )}
        </>
      ),
    },
    {
      id: 2,
      name: isLoading ? "" : userData?.name,
      designation: "Link to Account",
      content: (
        <>
          {isLoading ? (
            "Loading..."
          ) : (
            <p>
              We have only the data we have permission and access to. If you
              need to see more data about you, kindly{" "}
              <a target={"_blank"} href={userData?.link}>
                <Highlight>click here</Highlight>
              </a>{" "}
              to access your account.
            </p>
          )}
        </>
      ),
    },
  ];

  const fetchFacebookUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture,friends,short_name,gender,birthday,age_range,likes{name},favorite_athletes,favorite_teams,music,link,posts&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Facebook");
      }

      const data = await response.json();

      setUserData(data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching user info from Facebook:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchFacebookUserInfo(accessToken);
    } else {
      setIsLoading(false); // Stop loading if no access token
    }
  }, [accessToken]);

  return (
    <div className="container mx-auto my-10 px-4">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex justify-between items-center gap-x-2">
            <LoaderCircle className="animate-spin repeat-infinite text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Loading user data...
            </p>
          </div>
        </div>
      ) : accessToken ? (
        error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          userData && (
            <>
              <div className="relative -mt-[40px] md:-mt-[100px]">
                <LampComponent
                  text1={userData.short_name || "Anonymous"}
                  text2={userData.name || "Anonymous"}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 -mt-[250px] md:-mt-[270px]">
                <div className="flex items-center justify-center ">
                  <CardStack items={CARDS} />
                </div>
              </div>
            </>
          )
        )
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-red-500">
            The token has expired. Kindly{" "}
            <Link href={"/home"} className="text-green-500 underline">
              update
            </Link>{" "}
            your access token.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
