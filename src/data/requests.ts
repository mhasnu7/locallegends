// src/data/requests.ts
export interface Request {
  id: string;
  serviceType: string; // e.g., 'Plumbing', 'Electrical', 'Unlisted'
  description: string;
  phone: string;
  provider: string | null; // Assigned provider, null if unassigned
  status: 'Pending' | 'Done'; // Current Status
}

// Renamed from initialRequests to REQUESTS as expected by consumers
export let REQUESTS: Request[] = [
  {
    id: 'req001',
    serviceType: 'Plumbing',
    description: 'Leaky faucet in the kitchen sink.',
    phone: '555-1234',
    provider: 'John Doe Plumbing',
    status: 'Pending',
  },
  {
    id: 'req002',
    serviceType: 'Unlisted',
    description: 'Need help moving a heavy sofa this Saturday.',
    phone: '555-5678',
    provider: null,
    status: 'Pending',
  },
  {
    id: 'req003',
    serviceType: 'Electrical',
    description: 'New ceiling fan installation in the master bedroom.',
    phone: '555-9012',
    provider: 'Electric Pros Inc.',
    status: 'Done',
  },
  {
    id: 'req004',
    serviceType: 'Metal Fabrication',
    description: 'Repair a broken railing section on the back porch.',
    phone: '555-3456',
    provider: null,
    status: 'Pending',
  },
  {
    id: 'req005',
    serviceType: 'Cleaning',
    description: 'Deep clean for move-out service.',
    phone: '555-7890',
    provider: 'Sparkle Cleaners',
    status: 'Done',
  },
];

export const AVAILABLE_FILTERS = [
  'All',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Carpentry',
  'Painting',
  'Gardening',
  'Metal Fabrication',
  'Unlisted',
];

// Renamed from saveRequest to addRequest as expected by CreateRequestScreen/UnlistedServiceScreen
export const addRequest = (newRequest: Omit<Request, 'id'>): Request => {
  const id = `req${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const request: Request = {
    ...newRequest,
    id,
    status: newRequest.status || 'Pending',
    provider: newRequest.provider || null, // New requests are unassigned by default
  };
  // In a real app, this would call a backend. Here, we update the local list and log.
  REQUESTS = [request, ...REQUESTS];
  console.log('Request Added:', request);
  return request;
};
