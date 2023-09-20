import { GetQueryInterface } from 'interfaces';

export interface DeviceInfoInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface DeviceInfoGetQueryInterface extends GetQueryInterface {
  id?: string;
}
