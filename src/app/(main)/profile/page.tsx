"use client";
import { useState, useEffect } from "react";
import { LampComponent } from "@/components/Global/lamp";
import { useSession } from "../SessionProvider";
import { BlurText } from "@/components/Animated/BlurText";
import Image from "next/image";
import userAvatar from "@/assets/UserAvatar.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";

const FacebookDataFetcher: React.FC = () => {
  const { user } = useSession();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    fullName: user?.fullName || "",
    bio: user?.bio || "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }, // isDirty will track if any field is modified
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      bio: user?.bio || "",
    },
  });

  useEffect(() => {
    // Set the initial data on component mount
    setInitialData({
      fullName: user?.fullName || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const api = "/api/auth/profile/updateProfile";
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const resData = await res.json();
        toast({
          title: "Profile updated",
          description: resData.message,
        });
        setIsDialogOpen(false);
      } else {
        const errorData = await res.json();
        toast({
          title: "Error updating profile",
          description: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disable the button if no changes are made (i.e., data is unchanged)
  const isSaveDisabled = !isDirty;

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="relative -mt-[40px] md:-mt-[100px]">
        <LampComponent
          text1={user?.username || "Anonymous"}
          text2={user?.fullName || "Anonymous"}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 -mt-[250px] md:-mt-[200px]">
        <div className="flex items-center justify-center ">
          <Image
            alt="User Avatar"
            src={user?.profilePic ? user.profilePic : userAvatar}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border border-gray-300 z-50"
          />

          <ul className="ml-4">
            <li>
              <BlurText
                text={user?.email || ""}
                className="text-sm text-muted-foreground"
                delay={50}
              />
            </li>
            <li>
              <BlurText
                text={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""
                }
                className="text-sm text-muted-foreground"
                delay={50}
              />
            </li>
            <li>
              <BlurText
                text={user?.bio || "It looks like you don't have a bio yet"}
                className="text-sm text-muted-foreground"
                delay={50}
              />
            </li>
          </ul>
        </div>

        <div className="z-50 flex justify-end">
          <Button onClick={() => setIsDialogOpen(true)}>Update Profile</Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="mx-1">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input {...field} placeholder="Enter your full name" />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <Input {...field} placeholder="Enter your bio" />
                  </div>
                )}
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <LoadingButton loading={isLoading} disabled={isSaveDisabled}>
                Save Changes
              </LoadingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacebookDataFetcher;
