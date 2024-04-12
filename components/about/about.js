import React from 'react'
import About from '../common/about'
import items from '../../public/data/about/about.json'
export default function about() {
    const about = items.about
    return (
        <About
            imageSrc={about[0].imageSrc}
            heading={about[0].heading}
            point={about[0].point}
            p1={about[0].p1}
            p2={about[0].p2}
        />
    )
}
