'use client';

import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

export type TicketItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  obs?: string;
  adicionais?: { label: string; price: number; quantity?: number }[];
  restaurantName?: string;
};

type TicketAction =
  | { type: 'ADD_ITEM'; payload: TicketItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_ITEM'; payload: { index: number; item: TicketItem } }
  | { type: 'SET_ALL_ITEMS'; payload: TicketItem[] };

function ticketReducer(state: TicketItem[], action: TicketAction): TicketItem[] {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'REMOVE_ITEM':
      return state.filter((_, index) => index !== action.payload);
    case 'UPDATE_ITEM':
      return state.map((item, index) =>
        index === action.payload.index ? action.payload.item : item
      );
    case 'SET_ALL_ITEMS':
      return [...action.payload];
    default:
      return state;
  }
}

const TicketContext = createContext<{
  state: TicketItem[];
  dispatch: Dispatch<TicketAction>;
}>({
  state: [],
  dispatch: () => {},
});

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ticketReducer, []);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
export { TicketContext };
