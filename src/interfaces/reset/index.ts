import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ResetInterface {
  id?: string;
  user_id: string;
  date_reset?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ResetGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
