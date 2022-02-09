export interface MenuItem {
  image: string;
  name: string;
  plu: number;
  price: string;
}

export interface CartRow {
  item: MenuItem;
  quantity: number;
}

export const CHEESE_BURGER: MenuItem = {
  image: 'assets/cheese-burger.jpg',
  name: 'Cheese Burger',
  plu: 1,
  price: '$10.00',
};
export const AVOCADO_TOAST: MenuItem = {
  image: 'assets/avocado-toast.jpg',
  name: 'Avocado Toast',
  plu: 2,
  price: '$6.95',
};
export const EGGS_BENEDICT: MenuItem = {
  image: 'assets/eggs-benedict.jpg',
  name: 'Eggs Benedict',
  plu: 3,
  price: '$12.75',
};

export default [AVOCADO_TOAST, CHEESE_BURGER, EGGS_BENEDICT];
