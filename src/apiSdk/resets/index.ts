import axios from 'axios';
import queryString from 'query-string';
import { ResetInterface, ResetGetQueryInterface } from 'interfaces/reset';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getResets = async (query?: ResetGetQueryInterface): Promise<PaginatedInterface<ResetInterface>> => {
  const response = await axios.get('/api/resets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createReset = async (reset: ResetInterface) => {
  const response = await axios.post('/api/resets', reset);
  return response.data;
};

export const updateResetById = async (id: string, reset: ResetInterface) => {
  const response = await axios.put(`/api/resets/${id}`, reset);
  return response.data;
};

export const getResetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/resets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteResetById = async (id: string) => {
  const response = await axios.delete(`/api/resets/${id}`);
  return response.data;
};
