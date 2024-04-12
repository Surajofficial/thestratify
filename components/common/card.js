import React from 'react'
export default function card(props) {
    return (
        <div className={props.classes} style={{
            cursor: 'pointer'
        }}>
            <div className="icon-box" >
                {props.data}
            </div>
        </div >
    )
}