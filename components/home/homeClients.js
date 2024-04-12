import React from 'react'
import Clients from '../common/clientsInner'
import items from '../../public/data/home/homeClient.json'
export default function homeClients() {
    const client = items.client
    return (
        <Clients client={client[0].client} heading={client[0].heading} para={client[0].para} />
    )
}
