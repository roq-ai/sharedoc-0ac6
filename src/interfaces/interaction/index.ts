import { UserInterface } from 'interfaces/user';
import { DocumentInterface } from 'interfaces/document';
import { GetQueryInterface } from 'interfaces';

export interface InteractionInterface {
  id?: string;
  type: string;
  user_id?: string;
  document_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  document?: DocumentInterface;
  _count?: {};
}

export interface InteractionGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  user_id?: string;
  document_id?: string;
}
