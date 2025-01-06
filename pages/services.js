import React from 'react'
import Breadcrumbs from '../components/common/breadcrumbs'
import Services from '../components/services/services'
import { motion } from "framer-motion";
export default function services() {
    return (
        <motion.main style={{ opacity: 0 }}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 360 }}
            id='main'
            transition={{
                duration: 2
            }}>

            <Breadcrumbs page="Services" />
            <section id="services" className="services">
                <div className="container">
                    <Services />
                </div>
            </section>
        </motion.main>
    )
}
