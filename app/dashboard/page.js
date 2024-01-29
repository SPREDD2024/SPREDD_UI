"use client";
import React, { useEffect } from "react";
import Dashboard from "../components/dashboard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const DashboardRoute = () => {
  const { user } = useUser();
  const route = useRouter();

  useEffect(() => {
    if (!user) {
      route.push("/signedOut");
    }
  }, [user]);

  return <Dashboard />;
};

export default DashboardRoute;
