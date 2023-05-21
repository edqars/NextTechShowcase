import * as api from 'api/profile';
import { useQuery } from '@tanstack/react-query';

export const useProfile = (id) =>
  useQuery(['profile', id], () => api.getProfile(id));
