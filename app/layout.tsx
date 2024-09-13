import type { Metadata } from "next";
import "./styles/globals.css";
import HeaderComponent from "./components/header.component";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "ShipApp",
  description: "Gestión de carga de barcos",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider count={0}>
          <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <main className="flex-grow">{children}</main>
            <footer className="bg-gray-800 text-white py-4">
              <p>footer</p>
            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
