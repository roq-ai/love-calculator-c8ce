import axios from 'axios';
import queryString from 'query-string';
import { DeviceInfoInterface, DeviceInfoGetQueryInterface } from 'interfaces/device-info';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDeviceInfos = async (
  query?: DeviceInfoGetQueryInterface,
): Promise<PaginatedInterface<DeviceInfoInterface>> => {
  const response = await axios.get('/api/device-infos', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDeviceInfo = async (deviceInfo: DeviceInfoInterface) => {
  const response = await axios.post('/api/device-infos', deviceInfo);
  return response.data;
};

export const updateDeviceInfoById = async (id: string, deviceInfo: DeviceInfoInterface) => {
  const response = await axios.put(`/api/device-infos/${id}`, deviceInfo);
  return response.data;
};

export const getDeviceInfoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/device-infos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDeviceInfoById = async (id: string) => {
  const response = await axios.delete(`/api/device-infos/${id}`);
  return response.data;
};
