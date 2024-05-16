import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AppContainer } from "processes/app-container";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
