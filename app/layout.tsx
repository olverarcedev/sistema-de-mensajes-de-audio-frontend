import type { Metadata } from "next";
import "./styles/globals.css";
import StoreProvider from "./StoreProvider";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Sistema de mensajes de audio",
  description: "Sistema de mensajes de audio",
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
        <StoreProvider count={0} audioMessages={[]}>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
