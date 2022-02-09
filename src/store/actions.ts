import { curry } from 'ramda';
import ITEMS, { CartRow, MenuItem } from '../items.js';
import { State } from './state.js';

const setQuantity = curry(
  (quantityOrFn: number | ((q: number) => number), row: CartRow): CartRow => ({
    ...row,
    quantity:
      typeof quantityOrFn === 'function'
        ? quantityOrFn(row.quantity)
        : quantityOrFn,
  })
);

const updateItemByPlu = curry(
  (
    fn: (row: CartRow) => CartRow,
    plu: MenuItem['plu'],
    cart: CartRow[]
  ): CartRow[] => {
    const exists = cart.find(({ item }) => item.plu === plu);
    if (!exists) {
      throw new Error(`Item with plu '${plu}' does not exist in cart.`);
    }
    return cart.map(row => (row.item.plu === plu ? fn(row) : row));
  }
);

export const setQuantityByPlu = curry(
  (plu: MenuItem['plu'], quantity: number, state: State): State => ({
    ...state,
    cart: updateItemByPlu(setQuantity(quantity), plu, state.cart),
  })
);

export const addItemByPlu = curry(
  (plu: MenuItem['plu'], state: State): State => {
    const item = ITEMS.find(_item => _item.plu === plu) as MenuItem;
    return { ...state, cart: [...state.cart, { item, quantity: 1 }] };
  }
);

export const removeItemByPlu = curry(
  (plu: MenuItem['plu'], state: State): State => {
    const exists = state.cart.find(({ item }) => item.plu === plu);
    if (!exists) {
      throw new Error(`Item with plu '${plu}' does not exist in cart.`);
    }

    return {
      ...state,
      cart: state.cart.filter(({ item }) => item.plu !== plu),
    };
  }
);
