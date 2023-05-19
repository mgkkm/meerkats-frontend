import { atom } from 'recoil';
import { MembershipCardData } from '../pages/Membership/Membership';

export const membershipState = atom<MembershipCardData[]>({
  key: 'membershipState',
  default: [
    {
      id: 0,
      name: '',
      price: '',
      content: '',
      ticketProvision: 0,
      benefit: '',
    },
  ],
});
