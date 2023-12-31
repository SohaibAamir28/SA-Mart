import Footer from "../../components/hero/Footer";
import Navbar from "../../components/hero/Navbar";
import Tail from "../../components/hero/Tail";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../../components/Provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SA Mart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gradient-to-r from-teal-200 to-teal-500">
        <Providers>
          <Navbar/>
          {children}
          <Footer/>
          <Tail />
        </Providers>
        </div>
      </body>
    </html>
  );
}
