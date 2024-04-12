import React from 'react'
import Image from 'next/image'
export default function about(props) {
    return (
        <section id="about" className="about">
            <div className="container">

                <div className="row">
                    <div className="col-lg-6" >
                        <Image src={props.imageSrc} height="500" width="600" style={{ position: 'absolute', height: 'auto !important', width: 'auto !important' }} className="img-fluid" alt=""

                        />
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content">
                        <h3>{props.heading}</h3>
                        <p className="fst-italic">
                            {props.p1}
                        </p>
                         <h3>{props.heading2}</h3>
                        <ul>
                            {
                                props.point.map((item, key) => (
                                    <li key={key}><i className="bi bi-check-circle"></i>{item}</li>
                                ))
                            }
                        </ul>
                        <p>
                            {props.p2}
                        </p>
                    </div>
                </div>

            </div>
        </section >
    )
}
