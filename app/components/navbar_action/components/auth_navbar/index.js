import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const AuthNavbar = () => {
  return (
    <div>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default AuthNavbar;
