import React from 'react'
import Link from 'next/link'
import parse from 'html-react-parser'
export default function homeCardInner(props) {
    // const parse = require('html-react-parser');
    return (
        <>
            {parse(props.icon)}
            <h4><Link href={props.link}>{props.title}</Link></h4>
            <p>{props.dec}</p>
        </>
    )
}
