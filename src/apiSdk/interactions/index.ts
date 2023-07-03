import axios from 'axios';
import queryString from 'query-string';
import { InteractionInterface, InteractionGetQueryInterface } from 'interfaces/interaction';
import { GetQueryInterface } from '../../interfaces';

export const getInteractions = async (query?: InteractionGetQueryInterface) => {
  const response = await axios.get(`/api/interactions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInteraction = async (interaction: InteractionInterface) => {
  const response = await axios.post('/api/interactions', interaction);
  return response.data;
};

export const updateInteractionById = async (id: string, interaction: InteractionInterface) => {
  const response = await axios.put(`/api/interactions/${id}`, interaction);
  return response.data;
};

export const getInteractionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/interactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInteractionById = async (id: string) => {
  const response = await axios.delete(`/api/interactions/${id}`);
  return response.data;
};
