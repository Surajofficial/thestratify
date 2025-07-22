import '@/styles/globals.css'
import '@/styles/assets/vendor/animate.css/animate.min.css'
import '@/styles/assets/vendor/bootstrap/css/bootstrap.min.css'
import '@/styles/assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '@/styles/assets/vendor/boxicons/css/boxicons.min.css'
import '@/styles/assets/vendor/glightbox/css/glightbox.min.css'
import '@/styles/assets/css/style.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper styles
import 'swiper/css';
import NextNProgress from 'nextjs-progressbar';
import Nav from '../components/nav'
import Footer from '../components/footer'
import { useEffect } from "react";
import GlobalModal from "@/components/GlobalModal";
export default function App({ Component, pageProps, router }) {

  return (
    <>
      <Nav />
      <NextNProgress options={{ easing: 'ease', speed: 500, showSpinner: false }} />
      <Component {...pageProps} />
      <Footer />
      <GlobalModal />
    </>
  )

}
