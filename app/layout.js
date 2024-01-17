import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SPRERDD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <App children={children} />
        </body>
      </UserProvider>
    </html>
  );
}
