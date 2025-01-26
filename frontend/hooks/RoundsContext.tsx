// contexts/RoundsContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Round } from '../src/types/round.types';

interface RoundsContextType {
  rounds: Round[];
  updateRound: (updatedRound: Round) => void;
  setRounds: (rounds: Round[]) => void;
}

const RoundsContext = createContext<RoundsContextType | undefined>(undefined);

export function RoundsProvider({ children }) {
  const [rounds, setRounds] = useState<Round[]>([]);

  const updateRound = (updatedRound: Round) => {
    setRounds(prevRounds => 
      prevRounds.map(round => 
        round._id === updatedRound._id ? updatedRound : round
      )
    );
  };

  return (
    <RoundsContext.Provider value={{ rounds, updateRound, setRounds }}>
      {children}
    </RoundsContext.Provider>
  );
}

export const useRounds = () => {
  const context = useContext(RoundsContext);
  if (!context) throw new Error('useRounds must be used within RoundsProvider');
  return context;
};