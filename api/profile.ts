import axios from 'utils/axiosInstance';
import { UserDTORequest } from '../components/UserForm/User';

export const getProfile = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return new UserDTORequest(data);
};
