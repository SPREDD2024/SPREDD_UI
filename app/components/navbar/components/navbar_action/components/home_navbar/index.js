import { Button } from "@mui/material";
import React, { useEffect } from "react";
import "./styles.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const HomeNavbar = () => {
  const { user } = useUser();

  const route = useRouter();
  
  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="button-group">
      <Link href="/api/auth/login">
        <Button style={{ color: "#fff"}} variant="contained">Sign In</Button>
      </Link>
    </div>
  );
};

export default HomeNavbar;
