import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "SPREDD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
