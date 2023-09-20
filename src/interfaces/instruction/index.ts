import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InstructionInterface {
  id?: string;
  description: string;
  date_created?: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface InstructionGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  user_id?: string;
}
