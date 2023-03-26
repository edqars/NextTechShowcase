import axios from "axios";


export default async function Posts(req, res) {

    const {start} = req.body

    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=12`)
    const data = await response.data

    return res.status(200).json({ data });

}


