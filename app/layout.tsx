import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "La Inteligencia de la Tierra - Scrollytelling",
    description: "Una experiencia inmersiva",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="antialiased selection:bg-[#39FF14] selection:text-black">
            <body
                className={`${inter.variable} ${playfair.variable} font-sans bg-[#0B0B1A] text-white overflow-x-hidden`}
            >
                <SmoothScroller>
                    {children}
                </SmoothScroller>
            </body>
        </html>
    );
}
