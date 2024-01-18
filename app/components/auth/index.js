import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Auth = () => {

  return (
    <div>
      <Link href="/api/auth/login">
        <Button variant="contained" color="primary">
          Sign In
        </Button>
      </Link>
    </div>
  );
};

export default Auth;
