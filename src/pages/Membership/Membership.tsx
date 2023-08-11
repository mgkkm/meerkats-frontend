import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useAxios from '../../hooks/useAxios';
import { membershipState } from '../../recoil/MembershipState';
import MembershipCard from './components/MembershipCard';

export interface MembershipData {
  data: MembershipCardData[];
}

export interface MembershipCardData {
  id: number;
  name: string;
  price: string;
  content: string;
  ticketProvision: number;
  benefit: string;
}

export default function Membership() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [, , , fetchData] = useAxios();

  const [membershipData, setMembershipData] = useRecoilState(membershipState);

  useEffect(() => {
    if (membershipData[0].id === 0)
      fetchData({
        url: `${BASE_URL}/membership`,
      }).then((result: MembershipData) => {
        if (result) {
          setMembershipData(result.data);
        }
      });
  }, []);

  return (
    <div className="container xl pt-48 flex justify-center">
      <div className="max-lg:flex-col gap-10 lg:w-full flex justify-center lg:gap-10 xl:gap-16">
        {membershipData?.map((membership, id) => {
          return <MembershipCard key={id} membership={membership} />;
        })}
      </div>
    </div>
  );
}
