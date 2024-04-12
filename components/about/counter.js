import React from 'react'
import CounteInner from './counterInner'
import items from '../../public/data/about/counter'

export default function counter() {
    const counter = items.counter
    return (
        <>
            {counter.map((item, key) => (
                <CounteInner key={key} link={item.link} count={item.count} para={item.para} linktext={item.linktext} icon={item.icon} />
            ))}
        </>
    )
}
