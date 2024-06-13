import { Dispatch, SetStateAction } from 'react';
import DataType from './carCardProps';

export interface ContextType {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}