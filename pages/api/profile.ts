import axiosInstance from "@component/utils/axiosInstance";

export default async function Profile(req, res) {

    const response = await axiosInstance.put(`/users/1`, req.body.values)

    const data = await response.data

    return res.status(200).json({data});
}
