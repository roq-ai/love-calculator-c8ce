import { CompatibilityInterface } from 'interfaces/compatibility';
import { GetQueryInterface } from 'interfaces';

export interface ShareInterface {
  id?: string;
  compatibility_id: string;
  platform: string;
  date_shared?: any;
  created_at?: any;
  updated_at?: any;

  compatibility?: CompatibilityInterface;
  _count?: {};
}

export interface ShareGetQueryInterface extends GetQueryInterface {
  id?: string;
  compatibility_id?: string;
  platform?: string;
}
