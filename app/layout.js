import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SPRERDD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App children={children}/>
      </body>
    </html>
  );
}
