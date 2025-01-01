"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import graphImage from "../assets/Main/Graph.gif";
import Evolution from "../assets/Main/Evolution.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import ShinyText from "@/components/Animated/ShinyText";
import { BlurText } from "../components/Animated/BlurText";
import Link from "next/link";
import Image from "next/image";
import {
  ChartArea,
  Handshake,
  Lightbulb,
  LockKeyhole,
  Route,
  Search,
  Settings2,
  Workflow,
} from "lucide-react";

const Page = () => {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <section className="h-screen snap-start flex flex-col bg-background text-foreground">
          <div className="flex justify-center items-center  ">
            <header className="flex justify-between items-center w-[80%] bg-[#202124] py-4 px-4 rounded-xl my-3 shadow-lg">
              <div>
                <h4>
                  <ShinyText
                    text="NetWiz"
                    disabled={false}
                    speed={2}
                    className="text-3xl font-bold"
                  />
                </h4>
              </div>
              <div>
                <ul className="hidden lg:flex justify-between items-center gap-x-8">
                  <li className="text-muted-foreground">
                    <Link href={""}>Pricing</Link>
                  </li>
                  <li className="text-muted-foreground">
                    <Link href={""}>Documentation</Link>
                  </li>
                  <li className="text-muted-foreground">
                    <Link href={""}>Blog</Link>
                  </li>
                </ul>
              </div>

              <Button>
                <Link href={"/signup"}>Get Started</Link>
              </Button>
            </header>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShinyText
              text="Manage your social circle"
              className="text-3xl lg:text-7xl font-semibold"
              disabled={false}
              speed={2}
            />
            <ShinyText
              text="with Graph"
              className="text-3xl lg:text-7xl font-semibold"
              disabled={false}
              speed={2}
            />
            <p className="text-muted-foreground text-sm lg:text-xl mx-1 my-6">
              A web app to analyze relationships between individuals and
              entities,
              <br />
              and to solve network analysis problems.
            </p>

            <Button className="rounder-sm lg:rounded-xl py-4 lg:py-6 px-4 lg:px-6 text-sm lg:text-1xl">
              Get Started for free
            </Button>
          </div>
        </section>

        {/* Description Section */}
        <section className="mx-8 snap-start h-screen flex flex-col justify-center items-center">
          <ShinyText
            text="Things we are providing to you"
            className="text-2xl lg:text-5xl font-bold"
            disabled={false}
            speed={2}
          />

          <p className="text-muted-foreground italic text-sm lg:text-1xl my-4 text-center lg:leading-8">
            Our platform empowers users to actively create and visualize dynamic
            social network graphs...
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-center ">
            <li className="p-3 lg:p-8 flex flex-col justify-between items-center gap-y-4 border-r-[0.5px] border-b-[0.5px] border-gray-100">
              <ChartArea />
              <p>Dynamic Graphs</p>
            </li>
            <li className="p-3 lg:p-8  flex flex-col justify-between items-center gap-y-4 lg:border-r-[0.5px] border-b-[0.5px] border-gray-100">
              <Workflow />
              <p>Interactive Nodes</p>
            </li>
            <li className="p-3 lg:p-8 flex flex-col justify-between items-center gap-y-4 border-r-[0.5px] border-b-[0.5px] border-gray-100">
              <Settings2 />
              <p>Customization</p>
            </li>
            <li className="p-3 lg:p-8 flex flex-col justify-between items-center border-b-[0.5px] border-gray-100 gap-y-4">
              <Handshake />
              <p>Community Detection</p>
            </li>
            <li className="p-3 lg:p-8  flex flex-col justify-between items-center gap-y-4 border-b-[0.5px] lg:border-b-0 border-r-[0.5px] border-gray-100">
              <Lightbulb />
              <p>Recommendation Systems</p>
            </li>
            <li className="p-3 lg:p-8  flex flex-col justify-between items-center gap-y-4 lg:border-r-[0.5px] border-b-[0.5px] lg:border-b-0 border-gray-100">
              <Search />
              <p>Search and Filtering node</p>
            </li>
            <li className="p-3 lg:p-8 flex flex-col justify-between items-center gap-y-4  border-r-[0.5px] border-gray-100">
              <Route />
              <p>Path Analysis</p>
            </li>
            <li className="p-3 lg:p-8 flex flex-col justify-between items-center gap-y-4 ">
              <LockKeyhole />
              <p>Privacy and Security</p>
            </li>
          </ul>
        </section>

        {/* Evolution Section */}
        <section className="mx-8 snap-start h-screen flex flex-col justify-center">
          {/* <h2 className="text-3xl font-bold text-start my-8">
            The Evolution of Social Network Graph Visualization
          </h2> */}
          <div className="flex justify-center items-center">
            <div>
              <Image src={Evolution} alt="Evolution" />
            </div>
            {/* <div>
              <h3 className="text-muted-foreground italic text-1xl leading-8">
                Over time, social networks have evolved into complex and
                interconnected ecosystems...
              </h3>
            </div> */}
          </div>
        </section>

        {/* Explanation Section */}
        <section className="bg-background py-16 px-6 snap-start h-screen flex flex-col justify-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Our Approach
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At NetWiz, we employ advanced graph algorithms to uncover
              actionable insights...
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-medium">
                  What Are Graph Algorithms in Social Networks?
                </AccordionTrigger>
                <AccordionContent>
                  Graph algorithms are sophisticated computational methods...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-medium">
                  Why Are Graph Algorithms Important?
                </AccordionTrigger>
                <AccordionContent>
                  Graph algorithms are essential for understanding the
                  dynamics...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-medium">
                  How Does NetWiz Apply Graph Theory?
                </AccordionTrigger>
                <AccordionContent>
                  NetWiz applies a comprehensive suite of graph algorithms...
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Explore More Section */}
        <section className="bg-background py-16 px-6 snap-start h-screen flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Explore Further</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Ready to dive deeper into the world of network analysis...
            </p>
            <Button className="px-8 py-4 text-lg">Start Exploring</Button>
          </div>
        </section>

        {/* Footer */}
      </div>
      <footer className="text-muted-foreground py-10 snap-start h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-xl font-semibold">NetWiz</h4>
            <p className="text-sm">
              Redefining Connectivity in the Digital Age
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost">Privacy Policy</Button>
            <Button variant="ghost">Terms of Service</Button>
            <Button variant="ghost">Contact Us</Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
