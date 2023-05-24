import axios from 'utils/axiosInstance';

export const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`/posts?_page=${pageParam}&_limit=10`);
  return data;
};

export const fetchPost = async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
};
