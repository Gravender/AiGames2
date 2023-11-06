import "~/styles/globals.css";
import { type Metadata } from "next";
import { Layout } from "@ui/Layout";
import { Providers } from "./providers";
import { type ReactNode } from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>
              <TRPCReactProvider headers={headers()}>
                {children}
              </TRPCReactProvider>
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
