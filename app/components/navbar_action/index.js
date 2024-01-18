"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HomeNavbar from "./components/home_navbar";
import SignedInNavbar from "./components/signed_in_navbar";


const Navbar_Action = () => {
  const pathName = usePathname();
  return <div>{pathName === "/" ? <HomeNavbar /> : <SignedInNavbar />}</div>;
};

export default Navbar_Action;
