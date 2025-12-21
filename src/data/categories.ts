export interface Category {
  id: string;
  name: string;
  icon: string; // MaterialCommunityIcons icon name
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Plumbing', icon: 'pipe-wrench' },
  { id: '2', name: 'Electrical', icon: 'lightning-bolt' },
  { id: '3', name: 'Cleaning', icon: 'broom' },
  { id: '4', name: 'Carpentry', icon: 'saw-blade' },
  { id: '5', name: 'Painting', icon: 'format-paint' },
  { id: '6', name: 'Gardening', icon: 'leaf' },
  { id: '7', name: 'Metal Fabrication', icon: 'factory' },
  { id: '8', name: 'Catering', icon: 'food-variant' },
];
