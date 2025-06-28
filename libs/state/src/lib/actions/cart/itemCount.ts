import { CartState } from '@dreckly/types';
import { getCartStats } from './getCartStats';

export const itemCount = (get: () => CartState) => {
  return () => {
    const state = get();
    return getCartStats(state).itemCount;
  };
};
