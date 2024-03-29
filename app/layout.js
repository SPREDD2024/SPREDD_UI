import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import App from "./app";

const libre = Libre_Franklin({ subsets: ["latin"] });
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "SPREDD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={libre.className}>
        <UserProvider>
          <App children={children} />
        </UserProvider>
      </body>
    </html>
  );
}
