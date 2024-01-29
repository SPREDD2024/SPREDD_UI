"use client";
import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./styles.css";
import Link from "next/link";
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
      <div className="button-group">
        <Link href="/api/auth/login">
          <Button variant="contained">Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default SignedOut;
