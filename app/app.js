"use client";
import React from "react";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Provider } from 'react-redux';
import store from '../app/store';

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6700",
    },
    secondary: {
      main: "#242c3d",
    },
    white: {
      main: "#ffffff",
    },
    grey: {
      main: "#8F96A9",
    },
  },
});

const App = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
