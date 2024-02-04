"use client";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./styles.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const SignedOut = () => {
  const { user } = useUser();

  const route = useRouter();

  useEffect(() => {
    if (user) {
      route.back();
    }
  }, [user]);

  return (
    <div className="signed-out">
      <Typography color="primary">You are Signed Out Please Sign In again to continue...</Typography>
    </div>
  );
};

export default SignedOut;
