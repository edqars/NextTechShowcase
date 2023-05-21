import axios from 'utils/axiosInstance';

export const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/posts?_page=${pageParam}&_limit=10`);
  const data = await res.data;
  return data;
};
