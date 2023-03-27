import axios from "axios";
import axiosInstance from "@component/utils/axiosInstance";


export default async function News(req, res) {

    const {start} = req.body

    const response = await axiosInstance.get(`/posts?_start=${start}&_limit=12`)
    const data = await response.data

    return res.status(200).json({ data });

}


