import type { Metadata } from "next";
import "./globals.scss";
import { AppContainer } from "processes";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: "Arm Management",
  description: "Created by Armat, used NextJS and NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
