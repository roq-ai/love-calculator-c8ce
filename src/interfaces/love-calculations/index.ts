import { GetQueryInterface } from 'interfaces';

export interface LoveCalculationsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface LoveCalculationsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
