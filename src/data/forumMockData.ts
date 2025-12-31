export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'PENDING' | 'ANSWERED';
}

export interface ForumReply {
  postId: string;
  adminId: string;
  replyText: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  createdAt: string;
}

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    userId: 'user123',
    title: 'Approximate cost for private cab from Bangalore to Mysore?',
    description: 'I am planning a trip next weekend. What would be the typical charges for a one-way drop?',
    createdAt: '2025-12-20T10:00:00Z',
    status: 'ANSWERED',
  },
  {
    id: '2',
    userId: 'user456',
    title: 'Looking for a verified plumber in Indiranagar',
    description: 'I have some leakage in my kitchen sink. Need someone reliable who can visit today.',
    createdAt: '2025-12-21T14:30:00Z',
    status: 'PENDING',
  },
  {
    id: '3',
    userId: 'user789',
    title: 'How to cancel a service request?',
    description: 'I accidentally created a duplicate request. How do I remove it?',
    createdAt: '2025-12-22T09:00:00Z',
    status: 'PENDING',
  },
];

export const MOCK_FORUM_REPLIES: ForumReply[] = [
  {
    postId: '1',
    adminId: 'admin1',
    replyText: 'A private cab typically costs between ₹2500 to ₹3500 depending on the car type.',
    visibility: 'PUBLIC',
    createdAt: '2025-12-20T11:00:00Z',
  },
];
