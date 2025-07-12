import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import ResponsiveNavbar from "@/components/Home/Navbar/ResponsiveNavbar";
import { Toaster } from "@/components/ui/sonner";


const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "AI Image Generator using Next.js and OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-gray-900 antialiased`}
      >
        <ResponsiveNavbar/>
        {children}
       <Toaster/>
      </body>
    </html>
  );
}
