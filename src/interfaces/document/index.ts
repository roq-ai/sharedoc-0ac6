import { InteractionInterface } from 'interfaces/interaction';
import { TagInterface } from 'interfaces/tag';
import { FolderInterface } from 'interfaces/folder';
import { GetQueryInterface } from 'interfaces';

export interface DocumentInterface {
  id?: string;
  name: string;
  metadata?: string;
  folder_id?: string;
  created_at?: any;
  updated_at?: any;
  interaction?: InteractionInterface[];
  tag?: TagInterface[];
  folder?: FolderInterface;
  _count?: {
    interaction?: number;
    tag?: number;
  };
}

export interface DocumentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  metadata?: string;
  folder_id?: string;
}
