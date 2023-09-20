import { GetQueryInterface } from 'interfaces';

export interface ErrorLogsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface ErrorLogsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
