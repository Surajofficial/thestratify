import React, { useRef } from 'react'
import Breadcrumbs from '../components/common/breadcrumbs'
import About from '../components/about/about'
import Client from '../components/about/clients'
import Counter from '../components/about/counter'
import items from '../public/data/about/testimonial.json'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
export default function about(props) {
    const scrollRef = useRef(null)
    const testimonial = items.testimonial
    return (
        <AnimatePresence mode='wait'>
            <motion.main
                style={{ opacity: 0 }}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 360 }}
                transition={{
                    duration: 2
                }}
                viewport={{ root: scrollRef }}
                id='main'
            >
                <Breadcrumbs page="About Us" />
                <About props={props.aboutData1} />
                <section id="counts" class="counts">
                    <div class="container">

                        <div class="row no-gutters">
                            <Counter />
                        </div>

                    </div>
                </section>
                <section id="testimonials" class="testimonials">
                    <div class="container">

                        <div class="section-title">
                            <h2>Testimonials</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div class="row">
                            {testimonial.map((item, key) => (

                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, rotateY: 180 }}
                                    whileInView={{ opacity: 1, rotateY: 360, }}
                                    transition={{
                                        duration: 1
                                    }}
                                    viewport={{ root: scrollRef }}
                                    class="col-lg-6">
                                    <div class="testimonial-item">
                                        <motion.img
                                            src={item.profile} class="testimonial-img" alt="" />
                                        <h3>{item.name}</h3>
                                        <h4>{item.position}</h4>
                                        <p>
                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                            {item.speech}
                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                        </div>

                    </div>
                </section>
                <Client />
            </motion.main>
        </AnimatePresence >
    )
}
export async function getServerSideProps(context) {
    let aboutData = await axios('https://thestratify.com/api/about/about')
    let aboutData1 = aboutData.data
    return {
        props: { aboutData1 }, // will be passed to the page component as props
    }
}