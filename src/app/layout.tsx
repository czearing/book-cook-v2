import "./global.css";
import { AppShell } from "@/components";
import type { RootLayoutProps } from "./layout.types";
import { Providers } from "./Providers";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
