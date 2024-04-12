import items from '../../public/data/common/client.json'
export default function handler(req, res) {
    res.status(200).json(items)
}