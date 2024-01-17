import { Button } from "@mui/material";
import React from "react";
import "./styles.css";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <div className="button-group">
      <Link href="/authenticate">
        <Button variant="outlined">Sign Up</Button>
      </Link>
      <Link href="/authenticate">
        <Button variant="contained">Sign In</Button>
      </Link>
    </div>
  );
};

export default HomeNavbar;
