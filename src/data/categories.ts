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
  { id: '6', name: 'Flower Decoration', icon: 'flower-tulip-outline' },
  { id: '7', name: 'Metal Fabrication', icon: 'factory' },
  { id: '8', name: 'Catering', icon: 'food-variant' },
  { id: '9', name: 'POP & False Ceiling', icon: 'wall' },
  { id: '10', name: 'CCTV', icon: 'video-security' },
  { id: '11', name: 'CSC Services', icon: 'laptop' },
  { id: '12', name: 'Transportation', icon: 'car' },
  { id: '13', name: 'Exotic Fruits', icon: 'fruit-cherries' },
  { id: '14', name: 'Printing & Signage', icon: 'printer' },
];

export const getCategoryById = (id: string) => {
  return CATEGORIES.find(category => category.id === id);
};
