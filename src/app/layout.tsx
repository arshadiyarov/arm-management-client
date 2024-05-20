import type { Metadata } from "next";
import "./globals.scss";
import { AppContainer } from "processes";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductsProvider } from "processes/products-context";

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
        <ProductsProvider>
          <AppContainer>{children}</AppContainer>
        </ProductsProvider>
      </body>
    </html>
  );
}
