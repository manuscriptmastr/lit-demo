import { CartRow } from '../items.js';

export interface State {
  cart: CartRow[];
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export const initialState: State = {
  cart: [],
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  dateOfBirth: '',
};
