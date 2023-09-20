import { GetQueryInterface } from 'interfaces';

export interface UserPreferencesInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface UserPreferencesGetQueryInterface extends GetQueryInterface {
  id?: string;
}
