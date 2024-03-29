"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HomeNavbar from "./components/home_navbar";
import SignedInNavbar from "./components/signed_in_navbar";

import "./styles.css";

const Navbar_Action = () => {
  const pathName = usePathname();
  return (
    <div className="nav-action">
      {pathName === "/" ? <HomeNavbar /> : <SignedInNavbar />}
    </div>
  );
};

export default Navbar_Action;
