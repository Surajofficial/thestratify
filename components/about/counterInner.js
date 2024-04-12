import React from 'react'
import CountUp from 'react-countup'
import parse from 'html-react-parser'
export default function counterInner(props) {
    return (
        <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
            <div className="count-box">
                <i className={parse(props.icon)}></i>
                <CountUp
                    start={0}
                    end={props.count}
                    duration={2.75}
                    decimals={0}
                    suffix=" +" />
                <p style={{ textAlign: 'justify' }}>{parse(props.para)}</p>
                <a href={props.link}>{props.linktext} &raquo;</a>
            </div>
        </div>
    )
}
