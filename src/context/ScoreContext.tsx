import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { Cat, Score } from '../types';

type State = {
  scores: Record<number, Score>;
};

type Action =
  | { type: 'INIT'; cats: Cat[] }
  | { type: 'VOTE'; winnerId: number; loserId: number }
  | { type: 'RESET' };

const ScoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT': {
      const base: Record<number, Score> = {};
      action.cats.forEach(c => {
        base[c.id] = base[c.id] ?? { id: c.id, name: c.name, url: c.url, wins: 0, played: 0 };
      });
      return { scores: base };
    }
    case 'VOTE': {
      const s = { ...state.scores };
      const win = { ...s[action.winnerId] };
      const lose = { ...s[action.loserId] };
      win.wins += 1; win.played += 1;
      lose.played += 1;
      s[win.id] = win; s[lose.id] = lose;
      return { scores: s };
    }
    case 'RESET': {
      const resetScores: Record<number, Score> = {};
      Object.values(state.scores).forEach(sc => {
        resetScores[sc.id] = { ...sc, wins: 0, played: 0 };
      });
      return { scores: resetScores };
    }
    default:
      return state;
  }
}

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { scores: {} });
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
};

export function useScores() {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error('useScores must be used within ScoreProvider');
  return ctx;
}