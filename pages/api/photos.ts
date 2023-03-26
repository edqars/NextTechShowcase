import axios from "axios";

export default async function handler(req, res) {

    const {start} = req.body

    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=10`)
    const data = await response.data

    return res.status(200).json({ data });
}

