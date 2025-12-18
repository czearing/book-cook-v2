import "./global.css";
import { ThemeProvider } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider theme={"light"}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
