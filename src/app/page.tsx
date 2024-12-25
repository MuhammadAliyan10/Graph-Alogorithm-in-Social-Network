"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <main className="relative flex flex-col gap-0 h-[150vh] items-start justify-center bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 p-4 mx-6 flex justify-between items-center bg-transparent bg-opacity-70 backdrop-blur-md z-20">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-800">
          NetViz
        </h1>
        <div className="space-x-6">
          <Button className="text-md bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 rounded-md hover:scale-105 transform transition-all">
            <a href="/register">Sign In</a>
          </Button>
          <Button className="text-md bg-gradient-to-r from-gray-600 to-gray-800 px-6 py-3 rounded-md hover:scale-105 transform transition-all">
            <a href="/login">Log In</a>
          </Button>
        </div>
      </nav>

      <div className="relative left-0 z-10 mt-[8rem] ml-10 w-full sm:w-1/2">
        {/* App Title */}
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          NetWiz: Connect, Analyze & Visualize
        </motion.h1>

        {/* App Description */}
        <motion.p
          className="text-1xl italic md:text-1xl text-gray-300 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Explore the power of graph algorithms with our Social Network analysis
          tool. Connect with your network, visualize relationships, and optimize
          interactions for a better online experience. NetWiz uses advanced
          algorithms to help you analyze and visualize complex relationships
          across your social media network. Discover hidden insights, track
          influential connections, and improve your online engagement
          strategies.
        </motion.p>

        {/* Features Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-4">
            Key Features
          </h2>
          <ul className="space-y-6 text-md italic text-gray-300 ">
            <li className="flex items-center">
              <span className="text-yellow-400">✨ </span> Personalized
              recommendations using graph algorithms
            </li>
            <li className="flex items-center">
              <span className="text-blue-400">🔗 </span> Seamless integration
              with social media platforms like Facebook, X, and Instagram
            </li>
            <li className="flex items-center">
              <span className="text-green-400">📊 </span> Advanced social
              network analysis
            </li>
            <li className="flex items-center">
              <span className="text-purple-400">🔒 </span> Private and secure
              data handling
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="space-y-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ul>
            <li>
              <p>
                Contribute on{" "}
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
              </p>
            </li>
            <li>
              <p>
                Follow us on{" "}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  X (formerly Twitter)
                </a>
              </p>
            </li>
            <li>
              <p>
                Connect with friends on{" "}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Facebook
                </a>
              </p>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-gray-400 py-6 mt-auto w-full">
        <p>&copy; 2024 NetWiz. All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Page;
