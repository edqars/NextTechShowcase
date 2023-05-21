import axios from 'utils/axiosInstance';

export const getProfile = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};
