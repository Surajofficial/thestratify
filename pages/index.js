import Head from 'next/head'
import Image from 'next/image'
import Slide from '../components/slider/slide'
import HomeCard from '../components/home/homeCard'

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
        <title>Stratify Technology - Smart Digital Solutions for Growing SMEs & MSMEs</title>
        <meta name="description" content="Join us as we elevate your digital journey, where debugging is just a bump in the matrix and dreams come true. Welcome to the innovative geek side of things! Expert web development, mobile apps, and digital solutions." />
        <meta name="keywords" content="web development, mobile app development, digital solutions, SME solutions, MSME solutions, stratify technology, software development, website design, e-commerce development, react development, nextjs development, nodejs development, full stack development, digital transformation, business automation, cloud solutions, database management, API development, responsive design, UI/UX design, technology consulting, software consulting, digital marketing, SEO services, business growth, startup solutions, enterprise solutions, custom software, web applications, mobile applications, technology trends, programming, coding, development services" />
        <meta name="author" content="Stratify Technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Stratify Technology - Smart Digital Solutions for Growing SMEs & MSMEs" />
        <meta property="og:description" content="Join us as we elevate your digital journey with expert web development, mobile apps, and digital solutions. Welcome to the innovative geek side of things!" />
        <meta property="og:url" content="https://thestratify.com" />
        <meta property="og:site_name" content="Stratify Technology" />
        <meta property="og:image" content="https://thestratify.com/assets/img/website and app development services company.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stratify Technology - Smart Digital Solutions for Growing SMEs & MSMEs" />
        <meta name="twitter:description" content="Join us as we elevate your digital journey with expert web development, mobile apps, and digital solutions." />
        <meta name="twitter:image" content="https://thestratify.com/assets/img/website and app development services company.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://thestratify.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Stratify Technology",
            "url": "https://thestratify.com",
            "logo": "https://thestratify.com/assets/img/favicon.png",
            "description": "Smart Digital Solutions for Growing SMEs & MSMEs. Expert web development, mobile apps, and digital solutions.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://thestratify.com/contact"
            },
            "sameAs": [
              "https://thestratify.com/blog"
            ]
          })}
        </script>
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
        {/* <HomeAbout /> */}
        <section id="services" className="services">
          <div className="container">
            <h6 className='servicesHeading'>Why Businesses Trust Stratify Technology</h6>
            <HomeServices />
          </div>
        </section>
        <section className="services">
          <div className="services__container">
            <p className="services__eyebrow">Our Expertise</p>
            <h2 className="services__title">Why Choose Us</h2>

            <ul className="services__list">
              <li className="services__item">
                <i className="bx bx-line-chart services__icon"></i>
                <span className="services__text">Proven Expertise in Development & Marketing</span>
              </li>
              <li className="services__item">
                <i className="bx bx-git-branch services__icon"></i>
                <span className="services__text">Customized Solutions for Every Business</span>
              </li>
              <li className="services__item">
                <i className="bx bx-bar-chart-alt-2 services__icon"></i>
                <span className="services__text">Transparent & Result-Oriented Strategies</span>
              </li>
              <li className="services__item">
                <i className="bx bx-trending-up services__icon"></i>
                <span className="services__text">Dedicated Support & Growth Partner</span>
              </li>
            </ul>
          </div>
        </section>

        <HomeClient />
      </main>
    </motion.div>
  )
}
