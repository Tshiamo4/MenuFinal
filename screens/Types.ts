// src/types.ts
export type MenuItem = {
  id: string;
  name: string;
  course: 'Starter' | 'Main' | 'Dessert' | 'Beverage' | 'Other';
  price: number;
};
