import React from 'react'
import About from '../common/about'
import items from '../../public/data/home/homeabout'
export default function homeAout() {
    const about = items.about
    return (
        <About
            imageSrc={about[0].imageSrc}
            heading={about[0].heading}
            heading2={about[0].heading2}
            point={about[0].point}
            p1={about[0].p1}
            p2={about[0].p2}
        />
    )
}
