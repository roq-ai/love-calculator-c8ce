import axios from 'axios';
import queryString from 'query-string';
import { LoveCalculationsInterface, LoveCalculationsGetQueryInterface } from 'interfaces/love-calculations';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLoveCalculations = async (
  query?: LoveCalculationsGetQueryInterface,
): Promise<PaginatedInterface<LoveCalculationsInterface>> => {
  const response = await axios.get('/api/love-calculations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLoveCalculations = async (loveCalculations: LoveCalculationsInterface) => {
  const response = await axios.post('/api/love-calculations', loveCalculations);
  return response.data;
};

export const updateLoveCalculationsById = async (id: string, loveCalculations: LoveCalculationsInterface) => {
  const response = await axios.put(`/api/love-calculations/${id}`, loveCalculations);
  return response.data;
};

export const getLoveCalculationsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/love-calculations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLoveCalculationsById = async (id: string) => {
  const response = await axios.delete(`/api/love-calculations/${id}`);
  return response.data;
};
