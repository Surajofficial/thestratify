import React from 'react'
import HomeCardInner from './homeCardInner'
import Card from '../common/card'
import Items from '../../public/data/home/feature'
export default function homeCard() {
    const feature = Items.feature
    return (
        <>
            {
                feature.map((item, key) => (<Card
                    classes="col-lg-4 cards text-center"
                    key={key}
                    data={

                        <HomeCardInner
                            icon={item.icon}
                            link={item.link}
                            title={item.title}
                            dec={item.dec}
                        />}
                />))


            }
        </>
    )
}
