import React from 'react'
import Clients from './clientsInner'
import items from '../../public/data/common/client.json'
export default function homeClients() {
    const client = items.client
    return (
        <Clients client={client[0].client} heading={client[0].heading} para={client[0].para} />
    )
}
