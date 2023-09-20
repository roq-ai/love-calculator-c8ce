import axios from 'axios';
import queryString from 'query-string';
import { ErrorLogsInterface, ErrorLogsGetQueryInterface } from 'interfaces/error-logs';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getErrorLogs = async (
  query?: ErrorLogsGetQueryInterface,
): Promise<PaginatedInterface<ErrorLogsInterface>> => {
  const response = await axios.get('/api/error-logs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createErrorLogs = async (errorLogs: ErrorLogsInterface) => {
  const response = await axios.post('/api/error-logs', errorLogs);
  return response.data;
};

export const updateErrorLogsById = async (id: string, errorLogs: ErrorLogsInterface) => {
  const response = await axios.put(`/api/error-logs/${id}`, errorLogs);
  return response.data;
};

export const getErrorLogsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/error-logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteErrorLogsById = async (id: string) => {
  const response = await axios.delete(`/api/error-logs/${id}`);
  return response.data;
};
