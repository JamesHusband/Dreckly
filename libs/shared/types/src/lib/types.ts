export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Cuisine {
  name: string;
  icon:
    | 'PieChart'
    | 'Fish'
    | 'Utensils'
    | 'Soup'
    | 'Pizza'
    | 'Hamburger'
    | 'Cake'
    | 'Salad';
}
