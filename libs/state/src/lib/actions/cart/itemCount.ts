import { CartState } from '@dreckly/types';
import { getCartStats } from '@dreckly/utils';

export const itemCount = (get: () => CartState) => {
  return () => {
    const state = get();
    return getCartStats(state).itemCount;
  };
};
