import React from 'react'
import Clients from '../common/clientsInner'
import items from '../../public/data/about/client.json'
export default function cli() {
    const client = items.client
    return (
        <Clients client={client[0].client} heading={client[0].heading} para={client[0].para} />
    )
}
