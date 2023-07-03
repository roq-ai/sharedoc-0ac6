import axios from 'axios';
import queryString from 'query-string';
import { TagInterface, TagGetQueryInterface } from 'interfaces/tag';
import { GetQueryInterface } from '../../interfaces';

export const getTags = async (query?: TagGetQueryInterface) => {
  const response = await axios.get(`/api/tags${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTag = async (tag: TagInterface) => {
  const response = await axios.post('/api/tags', tag);
  return response.data;
};

export const updateTagById = async (id: string, tag: TagInterface) => {
  const response = await axios.put(`/api/tags/${id}`, tag);
  return response.data;
};

export const getTagById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tags/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTagById = async (id: string) => {
  const response = await axios.delete(`/api/tags/${id}`);
  return response.data;
};
