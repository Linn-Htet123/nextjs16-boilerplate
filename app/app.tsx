"use client";
import { QueryProvider } from "@/providers/tanstackQuery";

export const App = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <QueryProvider>{children}</QueryProvider>;
};
