import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import LenisScroll from "@/LenisScroll";
import { AppProvider } from "@/context/AppContext";  // Import the context provider

export default function App({ Component, pageProps, router }) {
  return (
    <AppProvider>
      <div className="main">
        <LenisScroll />
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </div>
    </AppProvider>
  );
}
