import React from 'react'
import Link from 'next/link'
export default function breadcrumbs(props) {
    return (
        <section id="breadcrumbs" className="breadcrumbs">
            <div className="container">

                <ol>
                    <li><Link href="/">Home</Link></li>
                    <li>{props.page}</li>
                </ol>
                <h2>{props.page}</h2>

            </div>
        </section>
    )
}
