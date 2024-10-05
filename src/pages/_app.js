import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css"
import LenisScroll from "@/LenisScroll";

export default function App({ Component, pageProps, router }) {
  return (
    <div className="main">
      <LenisScroll/> 
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </div>
  );
}
