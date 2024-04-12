import React from 'react'
import HomeCardInner from './homeCardInner'
import Card from '../common/card'
import Items from '../../public/data/home/homeservices'

export default function homeservices() {
    const feature = Items.services
    return (
        <div className="row">
            {
                feature.map((item, key) => (<Card
                    classes="col-lg-4 col-md-6 d-flex align-items-stretch  mt-4"
                    key={key}
                    data={

                        <HomeCardInner
                            icon={"<div class='icon'>" + item.icon + "</div>"}
                            link={item.link}
                            title={item.title}
                            dec={item.dec}
                        />}
                />))


            }
        </div>
    )
}
