import React from 'react'
import ServicesCardInner from './servicesCardInner'
import Card from '../common/card'
import Items from '../../public/data/services/services.json'

export default function services() {
    const services = Items.services
    return (
        <div className="row">
            {
                services.map((item, key) => (<Card
                    classes="col-lg-4 col-md-6 d-flex align-items-stretch  mt-4"
                    key={key}
                    data={

                        <ServicesCardInner
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
