"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "../SessionProvider";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../AuthContext";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const page = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchFacebookUserInfo = async (accessToken: string) => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        `https://graph.facebook.com/me?fields=friends&access_token=${accessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Facebook");
      }

      const data = await response.json();

      setUserData(data);
      console.log(data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching user info from Facebook:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchFacebookUserInfo(accessToken);
    } else {
      setIsLoading(false);
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
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 -mt-[250px] md:-mt-[270px]">
                <div className="flex items-center justify-center "></div>
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

export default page;
