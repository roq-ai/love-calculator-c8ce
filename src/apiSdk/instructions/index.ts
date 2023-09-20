import axios from 'axios';
import queryString from 'query-string';
import { InstructionInterface, InstructionGetQueryInterface } from 'interfaces/instruction';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInstructions = async (
  query?: InstructionGetQueryInterface,
): Promise<PaginatedInterface<InstructionInterface>> => {
  const response = await axios.get('/api/instructions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInstruction = async (instruction: InstructionInterface) => {
  const response = await axios.post('/api/instructions', instruction);
  return response.data;
};

export const updateInstructionById = async (id: string, instruction: InstructionInterface) => {
  const response = await axios.put(`/api/instructions/${id}`, instruction);
  return response.data;
};

export const getInstructionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/instructions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInstructionById = async (id: string) => {
  const response = await axios.delete(`/api/instructions/${id}`);
  return response.data;
};
