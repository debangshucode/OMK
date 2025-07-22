import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

import ClientLayout from "@/components/clientlayout";

import HeaderAction from "@/components/headeraction";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OurMoments Kolkata",
  description:
    "OurMoments Kolkata is a top-rated photography company based in Kolkata, offering wedding, pre-wedding, event, and corporate photography services across India. With experienced photographers, expert video editors, and a client-first approach, we deliver premium photo and video experiences with digital support. Capture your special moments anywhere in India with OurMoments – trusted storytellers in visual excellence.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <AuthProvider>
        
         <ClientLayout>{children}
          <Toaster 
          position="top-center"
        richColors

          />
          <HeaderAction 
        />
         </ClientLayout>
         </AuthProvider>
      </body>
    </html>
  );
}
