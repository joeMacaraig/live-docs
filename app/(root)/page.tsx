import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { DocumentHome } from "@/components/DocumentHome";
import { HomePage } from "@/components/HomePage";

const Home = async () => {
  const clerkUser = await currentUser();
  return <>{clerkUser ? <DocumentHome /> : <HomePage />}</>;
};

export default Home;
