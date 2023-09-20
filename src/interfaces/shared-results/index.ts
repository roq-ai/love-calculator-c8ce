import { GetQueryInterface } from 'interfaces';

export interface SharedResultsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface SharedResultsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
