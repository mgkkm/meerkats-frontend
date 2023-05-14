import React from 'react';
import MembershipCard from './components/MembershipCard';

export interface MembershipCardData {
  id: number;
  type: string;
  price: string;
  content: string;
  ticket: number;
  benefit: { id: number; content: string }[];
}

export default function Membership() {
  return (
    <div className="container xl pt-48 flex justify-center">
      <div className="max-lg:block lg:w-full flex justify-center gap-16 lg:gap-10 xl:gap-16">
        {MEMBERSHIP_CARD_DATA.map((membership, id) => {
          return <MembershipCard key={id} membership={membership} />;
        })}
      </div>
    </div>
  );
}

export const MEMBERSHIP_CARD_DATA = [
  {
    id: 1,
    type: 'Basic',
    price: '23,900',
    content: 'Get 2 FREE tickets \n Enjoy the best deals for couples',
    ticket: 2,
    benefit: [
      { id: 1, content: 'Get 2 FREE Movie Tickets' },
      { id: 2, content: 'Latest Updates about our VIP Events' },
      { id: 3, content: 'Watch All Contents with High Quality' },
    ],
  },
  {
    id: 2,
    type: 'Premium',
    price: '35,900',
    content: 'Get 4 FREE tickets \n Perfect fit for families with children',
    ticket: 4,
    benefit: [
      { id: 1, content: 'Get 4 FREE Movie Tickets' },
      { id: 2, content: 'Additional Tickets at the Member Price' },
      { id: 3, content: 'Exclusive Member Offers' },
    ],
  },
  {
    id: 3,
    type: 'Super',
    price: '39,900',
    content: 'Get 4 FREE tickets \n Exclusively for moviegoers',
    ticket: 4,
    benefit: [
      { id: 1, content: 'Get 4 FREE Movie Tickets' },
      { id: 2, content: 'Movie Primere Tickets' },
      { id: 3, content: 'Share Benefits with your Friends' },
    ],
  },
];
