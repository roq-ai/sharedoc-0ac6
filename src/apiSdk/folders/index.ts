import axios from 'axios';
import queryString from 'query-string';
import { FolderInterface, FolderGetQueryInterface } from 'interfaces/folder';
import { GetQueryInterface } from '../../interfaces';

export const getFolders = async (query?: FolderGetQueryInterface) => {
  const response = await axios.get(`/api/folders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFolder = async (folder: FolderInterface) => {
  const response = await axios.post('/api/folders', folder);
  return response.data;
};

export const updateFolderById = async (id: string, folder: FolderInterface) => {
  const response = await axios.put(`/api/folders/${id}`, folder);
  return response.data;
};

export const getFolderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/folders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFolderById = async (id: string) => {
  const response = await axios.delete(`/api/folders/${id}`);
  return response.data;
};
