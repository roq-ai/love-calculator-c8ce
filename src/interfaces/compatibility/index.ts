import { ShareInterface } from 'interfaces/share';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompatibilityInterface {
  id?: string;
  user1_id: string;
  user2_id: string;
  percentage: number;
  date_calculated?: any;
  created_at?: any;
  updated_at?: any;
  share?: ShareInterface[];
  user_compatibility_user1_idTouser?: UserInterface;
  user_compatibility_user2_idTouser?: UserInterface;
  _count?: {
    share?: number;
  };
}

export interface CompatibilityGetQueryInterface extends GetQueryInterface {
  id?: string;
  user1_id?: string;
  user2_id?: string;
}
