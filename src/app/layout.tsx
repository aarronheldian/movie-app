import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryProvider } from "@/providers/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextProvider } from "@/providers/firebase";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  header,
  children,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <AuthContextProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="gap-4 flex flex-col w-full max-w-2xl mx-auto p-4">
                {header}
                {children}
              </div>
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
