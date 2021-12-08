import { createContext, useState } from "react";

export const PeopleContext = createContext();

export function PeopleProvider({ children }) {
  const [people, setPeople] = useState([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
}
