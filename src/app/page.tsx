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

const Page = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-background text-foreground shadow-lg">
        <nav className="flex justify-between items-center mx-6 py-4">
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
            <Button variant="secondary">
              <Link href={"/signup"}>Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>
      <Separator />

      <section className="flex flex-col items-center justify-center text-center h-[90vh] w-full">
        <BlurText
          text="Welcome to the World of Connections"
          className="text-7xl font-extrabold"
          delay={40}
        />
        <ShinyText
          text="Unlocking the Potential of Graph Algorithms in Social Networks"
          disabled={false}
          speed={3}
          className="text-4xl my-4 "
        />
        <Button className="mt-6 px-[10rem] py-4 text-1xl tracking-widest">
          Get Started
        </Button>
      </section>

      {/* Description Section */}
      <section className="mx-8 h-[60vh]">
        <h2 className="text-3xl font-bold text-start my-8">
          Create and Visualize Dynamic Social Network Graphs
        </h2>
        <div className="grid grid-cols-2 gap-x-6 items-center">
          <div>
            <p className="text-muted-foreground italic text-1xl leading-8">
              Our platform empowers users to actively create and visualize
              dynamic social network graphs. This tool is indispensable for
              understanding and exploring complex relationships between
              entities. By adding nodes representing various elements—such as
              social media platforms—and drawing connections through edges,
              users can intuitively organize and examine their networks. The
              interface allows for the repositioning of nodes, offering
              flexibility in how the network is viewed. A user-friendly dialog
              interface simplifies the process of adding new nodes, ensuring a
              seamless experience. This interactive tool is especially valuable
              for experimenting with graph algorithms, analyzing connections,
              and visualizing how different entities interact within the
              network. Offering real-time visualization, it facilitates the
              identification of patterns, clusters, and connections, making it a
              powerful resource for learning, experimentation, and network
              analysis.
            </p>
          </div>
          <div>
            <Image
              src={graphImage}
              alt="GraphImage"
              className="h-full relative"
            />
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="mx-8  my-[10rem]">
        <h2 className="text-3xl font-bold text-start my-8">
          The Evolution of Social Network Graph Visualization
        </h2>
        <div className="grid grid-cols-2 gap-x-6 items-center">
          <div>
            <Image src={Evolution} alt="Evolution" />
          </div>
          <div>
            <h3 className="text-muted-foreground italic text-1xl leading-8">
              Over time, social networks have evolved into complex and
              interconnected ecosystems. Understanding the intricate
              relationships within these networks requires sophisticated
              visualization tools. By harnessing advanced graph algorithms,
              users can gain deeper insights into network dynamics. This section
              provides an overview of how our platform continues to evolve,
              offering users cutting-edge tools for visualizing and analyzing
              social networks in innovative ways.
            </h3>
          </div>
        </div>
      </section>
      <Separator />

      {/* Explanation Section */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Approach</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At NetWiz, we employ advanced graph algorithms to uncover actionable
            insights and meaningful patterns within social networks. Our mission
            is to transform raw network data into valuable information by
            analyzing connections, community structures, and user interactions.
            Here's an overview of our approach to revolutionizing the way
            networks are visualized and understood.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-medium">
                What Are Graph Algorithms in Social Networks?
              </AccordionTrigger>
              <AccordionContent>
                Graph algorithms are sophisticated computational methods
                designed to analyze relationships within a network. In social
                networks, these algorithms model interactions among users,
                groups, and pages. By examining these connections, we can
                identify influential nodes, uncover hidden communities, and
                detect emerging trends.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-medium">
                Why Are Graph Algorithms Important?
              </AccordionTrigger>
              <AccordionContent>
                Graph algorithms are essential for understanding the dynamics of
                social networks. They allow businesses and organizations to
                optimize user engagement, recommend relevant content, and detect
                anomalies such as spam or fraud. By identifying patterns, these
                algorithms provide actionable insights that drive
                decision-making.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-medium">
                How Does NetWiz Apply Graph Theory?
              </AccordionTrigger>
              <AccordionContent>
                NetWiz applies a comprehensive suite of graph algorithms to
                process complex network data. Our methodology involves intuitive
                visualizations that highlight key network insights, such as user
                behavior, interaction clusters, and trend predictions. By
                offering an interactive and user-friendly experience, we empower
                users to explore and analyze their networks effectively.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Separator />

      {/* Explore More Section */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Explore Further</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to dive deeper into the world of network analysis and graph
            algorithms? Our platform provides extensive resources, tutorials,
            and documentation to help you enhance your understanding of social
            network dynamics. Whether you're a researcher, developer, or
            enthusiast, NetWiz equips you with the tools you need to explore,
            analyze, and visualize social networks.
          </p>
          <Button className="px-8 py-4 text-lg">Start Exploring</Button>
        </div>
      </section>

      <Separator />

      {/* Footer */}
      <footer className="text-muted-foreground py-10">
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
