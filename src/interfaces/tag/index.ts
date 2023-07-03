import { DocumentInterface } from 'interfaces/document';
import { GetQueryInterface } from 'interfaces';

export interface TagInterface {
  id?: string;
  name: string;
  document_id?: string;
  created_at?: any;
  updated_at?: any;

  document?: DocumentInterface;
  _count?: {};
}

export interface TagGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  document_id?: string;
}
