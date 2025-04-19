import type { Metadata } from "next";
import Script from "next/script";
import { Tektur } from "next/font/google";
import "./globals.scss";
import './assets/scss/style.scss';

import { Menu } from "./components/Shared/menu";
import { Loading } from "./components/Shared/loading";
import { TgLoad } from "./components/Shared/tgLoad";
import { useLoadingState } from "./store";


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
const {LoadedState} = useLoadingState();
  return (
    <html lang="en">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      <body
        className={`${tektur.className}  antialiased`}
      >
   <Loading/>
   <TgLoad/>    
   {LoadedState == true && (<>{children}
 
 <Menu/></>)}
            
        <Script src="https://telegram.org/js/telegram-web-app.js"/>
      </body>
    </html>
  );
}
