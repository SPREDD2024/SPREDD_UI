import { Inter } from "next/font/google";
import "./globals.css";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "SPRERDD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <App children={children} />
        </UserProvider>
      </body>
    </html>
  );
}
