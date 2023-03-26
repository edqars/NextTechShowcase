import axios from "axios";


export default async function Profile(req, res) {

    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/1`, req.body.values)
    const data = await response.data

    return res.status(200).json({data});
}
