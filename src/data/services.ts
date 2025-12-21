export interface Service {
  id: string;
  categoryId: string;
  providerName: string;
  serviceName: string;
  area: string;
  owner: string;
  phone: string;
  location: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: '101',
    categoryId: '1',
    providerName: 'AquaFix Experts',
    serviceName: 'Full Home Plumbing',
    area: 'Downtown',
    owner: 'John Doe',
    phone: '+1 234 567 890',
    location: '123 Main St, Downtown',
    description: 'Expert plumbing services for all your leaks and pipes.',
  },
  {
    id: '102',
    categoryId: '1',
    providerName: 'Pipe Masters',
    serviceName: 'Emergency Repairs',
    area: 'Uptown',
    owner: 'Jane Smith',
    phone: '+1 987 654 321',
    location: '456 Oak Ave, Uptown',
    description: '24/7 emergency plumbing solutions.',
  },
  {
    id: '201',
    categoryId: '2',
    providerName: 'Volt Solutions',
    serviceName: 'Wiring & Repairs',
    area: 'Midtown',
    owner: 'Mike Sparks',
    phone: '+1 111 222 333',
    location: '789 Electric Way, Midtown',
    description: 'Certified electrical repairs and new installations.',
  },
  {
    id: '301',
    categoryId: '3',
    providerName: 'Sparkle Clean',
    serviceName: 'Deep Cleaning',
    area: 'Riverside',
    owner: 'Sarah Clean',
    phone: '+1 444 555 666',
    location: '321 Riverside Dr, Riverside',
    description: 'Professional deep cleaning for homes and offices.',
  },
  {
    id: '701',
    categoryId: '7',
    providerName: 'Metal Fabrication Works',
    serviceName: 'Metal Fabrication Works',
    area: 'Local',
    owner: 'Muzammil',
    phone: '9739799487',
    location: 'Local Area',
    description: 'High quality metal fabrication and welding services.',
  },
  {
    id: '801',
    categoryId: '8',
    providerName: 'Local Feast Caterers',
    serviceName: 'Party Catering - Small Events',
    area: 'All Local Areas',
    owner: 'Chef Ali',
    phone: '+1 555 123 4567',
    location: 'Central Kitchen',
    description: 'Specializing in quality catering for up to 50 guests. Customizable menu options.',
  },
  {
    id: '901',
    categoryId: '9',
    providerName: 'Bulk Buy Solutions',
    serviceName: 'Wholesale Goods Purchase',
    area: 'Industrial Zone',
    owner: 'Ravi Kumar',
    phone: '+1 666 777 888',
    location: 'Warehouse 42, Industrial Area',
    description: 'Bulk procurement and delivery of wholesale goods.',
  },
  {
    id: '902',
    categoryId: '9',
    providerName: 'Local Rides & Rentals',
    serviceName: 'Vehicle Rental',
    area: 'All Local Areas',
    owner: 'Suresh Singh',
    phone: '+1 999 000 111',
    location: 'Main Terminal, City Center',
    description: 'Affordable daily and weekly vehicle rental services.',
  },
];

export const getServiceById = (id: string) => {
  return SERVICES.find(service => service.id === id);
};
