import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import LenisScroll from "@/LenisScroll";
import { AppProvider } from "@/context/AppContext";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CustomCursor from "@/components/UI/CustomCursor";

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
      <div className="main">
        <LenisScroll />
        <AnimatePresence mode="wait">
          <CustomCursor />
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}
