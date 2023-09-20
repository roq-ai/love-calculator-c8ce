import axios from 'axios';
import queryString from 'query-string';
import { UserPreferencesInterface, UserPreferencesGetQueryInterface } from 'interfaces/user-preferences';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUserPreferences = async (
  query?: UserPreferencesGetQueryInterface,
): Promise<PaginatedInterface<UserPreferencesInterface>> => {
  const response = await axios.get('/api/user-preferences', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createUserPreferences = async (userPreferences: UserPreferencesInterface) => {
  const response = await axios.post('/api/user-preferences', userPreferences);
  return response.data;
};

export const updateUserPreferencesById = async (id: string, userPreferences: UserPreferencesInterface) => {
  const response = await axios.put(`/api/user-preferences/${id}`, userPreferences);
  return response.data;
};

export const getUserPreferencesById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-preferences/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserPreferencesById = async (id: string) => {
  const response = await axios.delete(`/api/user-preferences/${id}`);
  return response.data;
};
