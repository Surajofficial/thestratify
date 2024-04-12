import React from 'react'
import Breadcrumbs from '../components/common/breadcrumbs'
import Services from '../components/services/services'
import Image from 'next/image'
export default function services() {
    return (
        <main id='main'>
            <Breadcrumbs page="Services" />
            <section id="services" className="services">
                <div className="container">
                    <Services />
                </div>
            </section>
            <section id="skills" className="skills">
                <div className="container">

                    <div className="section-title">
                        <h2>Our Skills</h2>
                        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <Image src="/assets/img/skills-img.jpg" className="img-fluid" fill sizes='100%' alt="" />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 content">
                            <h3>Voluptatem dignissimos provident quasi corporis voluptates</h3>
                            <p className="fst-italic">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt direna past reda
                            </p>

                            <div className="skills-content">

                                <div className="progress">
                                    <span className="skill">HTML <i className="val">100%</i></span>
                                    <div className="progress-bar-wrap">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <div className="progress">
                                    <span className="skill">CSS <i className="val">90%</i></span>
                                    <div className="progress-bar-wrap">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <div className="progress">
                                    <span className="skill">JavaScript <i className="val">75%</i></span>
                                    <div className="progress-bar-wrap">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <div className="progress">
                                    <span className="skill">Photoshop <i className="val">55%</i></span>
                                    <div className="progress-bar-wrap">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
