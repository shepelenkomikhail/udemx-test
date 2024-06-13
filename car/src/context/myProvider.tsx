import React, { ReactNode, useState } from "react";
import content from "../data/data.json";
import DataType from "../Types/carCardProps";
import { ContextType } from "../Types/contextType";

interface ProviderProps {
  children: ReactNode;
}

export const MyContext = React.createContext<ContextType | undefined>(
  undefined
);

export default function myProvider({ children }: ProviderProps) {
  const [data, setData] = useState<DataType[]>(content);

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}
