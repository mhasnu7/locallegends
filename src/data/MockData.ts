export interface Category {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Electrical' },
  { id: 3, name: 'Cleaning' },
];

export const MOCK_SERVICES: Service[] = [
  { id: 101, categoryId: 1, name: 'Faucet Repair', description: 'Fixing leaky faucets and drains.', price: '$50 - $150' },
  { id: 102, categoryId: 1, name: 'Pipe Installation', description: 'New pipe installation for kitchens and bathrooms.', price: 'Quote Required' },
  { id: 201, categoryId: 2, name: 'Light Fixture Install', description: 'Install new ceiling lights or wall sconces.', price: '$40 - $80' },
  { id: 202, categoryId: 2, name: 'Circuit Breaker Fix', description: 'Troubleshooting and replacing faulty circuit breakers.', price: '$75 - $200' },
  { id: 301, categoryId: 3, name: 'Deep House Cleaning', description: 'Full interior cleaning service.', price: '$250+' },
  { id: 302, categoryId: 3, name: 'Window Washing', description: 'Exterior and interior window cleaning.', price: '$100 - $180' },
];