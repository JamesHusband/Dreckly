import { CartState, MenuItem } from '@dreckly/types';

export const setMenuItems = (set: any) => {
  return (items: MenuItem[]) => {
    set((state: CartState) => ({ ...state, menuItems: items }));
  };
};
