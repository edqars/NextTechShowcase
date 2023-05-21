import axios from 'utils/axiosInstance';

export const fetchPhotos = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/photos?_page=${pageParam}&_limit=20`);
  const data = await res.data;
  return { data, nextPage: pageParam + 1 };
};
