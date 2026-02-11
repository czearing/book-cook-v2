import "./global.css";
import type { RootLayoutProps } from "./layout.types";
import { Providers } from "./Providers";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
