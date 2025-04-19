import type { Metadata } from "next";
import Script from "next/script";
import { Tektur } from "next/font/google";
import "./globals.scss";
import './assets/scss/style.scss'

const tektur = Tektur({
  weight:  ['400','500','600','700','800','900'],
  subsets: ['latin', 'cyrillic'],
});




export const metadata: Metadata = {
  title: "TaskBattle",
  description: "TaskBattle - your task battle platform",
  icons:'/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tektur.className}  antialiased`}
      >
        {children}
        <Script src="https://telegram.org/js/telegram-web-app.js"/>
      </body>
    </html>
  );
}
