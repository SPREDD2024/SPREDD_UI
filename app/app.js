'use client'
import React from "react";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6700",
    },
    secondary: {
      main: "#242c3d",
    },
  },
});

const App = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {children}
    </ThemeProvider>
  );
};

export default App;
