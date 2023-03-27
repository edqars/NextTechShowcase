import axios from "axios";
import axiosInstance from "@component/utils/axiosInstance";

export default async function handler(req, res) {

    const {start} = req.body
    const response = await axiosInstance.get(`/photos?_start=${start}&_limit=10`)
    const data = response.data

    return res.status(200).json({ data });
}

