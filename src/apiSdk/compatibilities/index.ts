import axios from 'axios';
import queryString from 'query-string';
import { CompatibilityInterface, CompatibilityGetQueryInterface } from 'interfaces/compatibility';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCompatibilities = async (
  query?: CompatibilityGetQueryInterface,
): Promise<PaginatedInterface<CompatibilityInterface>> => {
  const response = await axios.get('/api/compatibilities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCompatibility = async (compatibility: CompatibilityInterface) => {
  const response = await axios.post('/api/compatibilities', compatibility);
  return response.data;
};

export const updateCompatibilityById = async (id: string, compatibility: CompatibilityInterface) => {
  const response = await axios.put(`/api/compatibilities/${id}`, compatibility);
  return response.data;
};

export const getCompatibilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/compatibilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCompatibilityById = async (id: string) => {
  const response = await axios.delete(`/api/compatibilities/${id}`);
  return response.data;
};
