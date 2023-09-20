import axios from 'axios';
import queryString from 'query-string';
import { SharedResultsInterface, SharedResultsGetQueryInterface } from 'interfaces/shared-results';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSharedResults = async (
  query?: SharedResultsGetQueryInterface,
): Promise<PaginatedInterface<SharedResultsInterface>> => {
  const response = await axios.get('/api/shared-results', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSharedResults = async (sharedResults: SharedResultsInterface) => {
  const response = await axios.post('/api/shared-results', sharedResults);
  return response.data;
};

export const updateSharedResultsById = async (id: string, sharedResults: SharedResultsInterface) => {
  const response = await axios.put(`/api/shared-results/${id}`, sharedResults);
  return response.data;
};

export const getSharedResultsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shared-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSharedResultsById = async (id: string) => {
  const response = await axios.delete(`/api/shared-results/${id}`);
  return response.data;
};
