import React from 'react'
import Link from 'next/link'
import parse from 'html-react-parser'
export default function servicesCardInner(props) {
    return (
        <>
            {parse(props.icon)}
            <h4><Link href={props.link}>{props.title}</Link></h4>
            <p>{props.dec}</p>
        </>
    )
}
