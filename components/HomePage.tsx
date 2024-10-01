import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";

export const HomePage = () => {
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex gap-4">
          <Link href="/sign-up">Sign Up</Link>
          <Link href="/sign-in">Sign In</Link>
        </div>
      </Header>
      <div className="block space-y-10 md:flex md:items-center md:gap-10 max-w-6xl mx-auto md:h-[50vh] h-full px-4">
        <div className="md:w-[40%] space-y-4">
          <h1 className="font-medium text-xl text-blue-300">LiveDocs</h1>
          <h2 className="font-bold text-4xl">
            Your Go-To Collaborative Editor.
          </h2>
          <p className="font-light text-gray-400 text-justify">
            Unlock the full power of collaboration with our game-changing
            editor! No more juggling between files or waiting for feedback—now
            you and your team can create, edit, and refine content together in
            real time. With dynamic live updates and instant comments.
          </p>
          <div className="py-5">
            <Link
              href="/sign-in"
              className="px-4 py-2 gradient-blue shadow rounded hover:opacity-70 duration-300 ease-in-out"
            >
              Get Started Now!
            </Link>
          </div>
        </div>
        <div className="relative group md:w-[50%] flex items-center justify-center">
          <Image
            src="/example-1.png"
            width={500}
            height={500}
            alt="ex-1"
            className="border-2 relative md:group-hover:cursor-pointer group-hover:z-10 md:group-hover:z-10 group-hover: md:group-hover:translate-y-20 group-hover:translate-y-20 md:group-hover:translate-x-40 transition ease-in-out duration-300"
          />
          <Image
            src="/example-2.png"
            width={500}
            height={500}
            alt="ex-2"
            className="border-2 absolute top-20 md:top-20 md:left-20 z-0 md:group-hover:-translate-x-20 group-hover:-translate-y-20 md:group-hover:-translate-y-20 transition ease-in-out duration-300"
          />
        </div>
      </div>
      <div className="absolute bottom-5 text-sm font-light text-gray-400">
        © 2024 JBM-LiveDocs
      </div>
    </main>
  );
};
