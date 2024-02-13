"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HomeNavbar from "./components/home_navbar";
import SignedInNavbar from "./components/signed_in_navbar";
import Link from "next/link";
import { Button } from "@mui/material";
import "./styles.css";

const Navbar_Action = () => {
  const pathName = usePathname();
  return (
    <div className="nav-action">
      <Link href="https://www.spredd.ai" className="center">
        <Button className="link">Home</Button>
      </Link>
      {pathName === "/" || pathName === "/signedOut" ? <HomeNavbar /> : <SignedInNavbar />}
    </div>
  );
};

export default Navbar_Action;
