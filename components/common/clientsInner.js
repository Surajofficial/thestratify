import React from 'react'
import Image from 'next/image'
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
export default function clients(props) {
    return (
        <section id="clients" className="clients">
            <div className="container">

                <div className="section-title">
                    <h2>{props.heading}</h2>
                    <p>{props.para}</p>
                </div>

                <Swiper
                    modules={[Pagination]}
                    pagination={{ type: 'bullets', clickable: true }}
                    scrollbar={{ draggable: true }}
                    speed={400}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: true
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 40
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 60
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 80
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 120
                        }
                    }}
                >

                    {props.client.map((item, key) => (<SwiperSlide key={key} >
                        <Image src={item} className="img-fluid"  style={{ maxHeight: '50px' }}alt="" fill sizes='100%' />
                    </SwiperSlide>))}
                </Swiper>

            </div>
        </section >
    )
}
