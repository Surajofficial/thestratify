import Head from 'next/head'
import Image from 'next/image'
import Slide from '../components/slider/slide'
import HomeCard from '../components/home/homeCard'
import HomeAbout from '../components/home/homeAbout'
import HomeServices from '../components/home/homeservices'
import HomeClient from '../components/home/homeClients'
import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.div style={{ opacity: 0 }}
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 360 }}
      transition={{
        duration: 2
      }}>
      <Head>
        <title>Smart Digital Solutions for Growing SMEs & MSMEs</title>
        < meta name="description"
          content='Join us as we elevate your digital journey, where debugging is just a bump in the matrix and dreams come true. "Welcome to the innovative geek side of things!' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="hero">
        <Slide />
      </section >
      <main id="main" >
        <section id="featured" className="featured">
          <div className="container">
            <div className="row">
              <HomeCard />
            </div>
          </div>
        </section>
        <HomeAbout />
        <section id="services" className="services">
          <div className="container">
            <HomeServices />
          </div>
        </section>
        <HomeClient />
      </main>
    </motion.div>
  )
}
