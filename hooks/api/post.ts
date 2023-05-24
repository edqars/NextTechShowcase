import * as api from 'api/news';
import { useQuery } from '@tanstack/react-query';

export const usePost = (id) => useQuery(['posts', id], () => api.fetchPost(id));
