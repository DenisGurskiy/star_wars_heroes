import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import { Inter } from "next/font/google"; // Importing the Inter font from Google Fonts
import "./globals.css"; // Importing global CSS styles

// Configuring the Inter font with the Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata object containing the title and description for the app
export const metadata: Metadata = {
  title: "Star Wars Heroes",
  description: "List of Star Wars Heroes and details",
};

// Functional component representing the root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML structure for the root layout
    <html lang="en">
      <body className={`${inter.className} bg-star-wars bg-cover bg-fixed`}>
        {children}
      </body>
    </html>
  );
}
