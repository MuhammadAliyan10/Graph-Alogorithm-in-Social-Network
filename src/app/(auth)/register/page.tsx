"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Import Font Awesome icons (if using the 'react-icons' library)
import { FaFacebookF, FaGoogle } from "react-icons/fa";

// Define the form data type
type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function ProfileForm() {
  // Initialize react-hook-form
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle the form submission logic here, like calling an API
  };

  // Custom validation for username
  const validateUsername = (value: string) => {
    if (value.length < 2) {
      return "Username must be at least 2 characters.";
    }
    return true;
  };

  return (
    <div className="relative flex flex-col gap-8 h-[100vh] items-center justify-center bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      {...form.register("username", {
                        validate: validateUsername,
                      })}
                      className="text-white bg-gray-700 border-white focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      {...form.register("email")}
                      className="text-white bg-gray-700 border-white focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      {...form.register("password")}
                      className="text-white bg-gray-700 border-white focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full
               bg-gradient-to-r from-gray-800 to-gray-600"
            >
              Submit
            </Button>
          </form>

          {/* Social Links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Or sign up with</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="#"
                className="inline-block p-3 bg-blue-600 rounded-full hover:bg-blue-700"
              >
                <FaFacebookF className="text-white text-xl" />{" "}
                {/* Facebook Icon */}
              </a>
              <a
                href="#"
                className="inline-block p-3 bg-red-600 rounded-full hover:bg-red-700"
              >
                <FaGoogle className="text-white text-xl" /> {/* Google Icon */}
              </a>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
