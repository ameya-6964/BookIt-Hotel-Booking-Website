import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { GlobalProvider } from "./GlobalProvider";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Head from "./Head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomePage - BookIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="https://kit.fontawesome.com/fe4d71f046.js"></Script>
      </body>
    </html>
  );
}
