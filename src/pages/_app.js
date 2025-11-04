import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import LenisScroll from "@/LenisScroll";
import { AppProvider } from "@/context/AppContext";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomCursor from "@/components/UI/CustomCursor";
import { Gilda_Display , Lora} from 'next/font/google'
import localFont from "next/font/local";

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/CabinetGrotesk-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cabinetGrotesk",
});

const gilda = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gilda',
})

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
});

 




export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Disable the default scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    // Handle scroll position on route change
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };  
  }, [router]);

  return (
    <AppProvider>
      <div className={`${gilda.variable} ${lora.variable} ${cabinetGrotesk.variable}`}>
        <LenisScroll />
        <AnimatePresence mode="wait">
          <CustomCursor />
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}
