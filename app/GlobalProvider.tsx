"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
