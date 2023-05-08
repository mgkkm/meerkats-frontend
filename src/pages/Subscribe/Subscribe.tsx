import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MembershipCard from '../Membership/components/MembershipCard';
import { MEMBERSHIP_CARD_DATA } from '../Membership/Membership';
import Option from './components/Option';
import Payment from './components/Payment';
import Terms from './components/Terms';

export default function Subscribe() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedType = params.id;

  const [currentType, setCurrentType] = useState(Number(selectedType));

  const changeType = (id: number) => {
    setCurrentType(id);
    navigate(`/membership/subscribe/${id}`);
  };

  return (
    <div className="container xl pt-24 ">
      <div className="bg-white pt-24 px-14 pb-10 flex justify-center gap-44 max-sm:h-[1900px] max-lg:h-[1850px] max-xl:h-[1050px] max-lg:block">
        <div className="subscriptionLeft max-lg:mb-10">
          <p className="text-3xl font-semibold">Subscribe meerkats!</p>
          <div className="py-10 text-mkDarkGray flex flex-col gap-10">
            <Option currentType={currentType} changeType={changeType} />
            <Payment />
          </div>
        </div>
        <div className="subscriptionRight w-96 max-lg:w-full">
          <div className="flex justify-center">
            <MembershipCard
              key={currentType && currentType - 1}
              membership={MEMBERSHIP_CARD_DATA[currentType && currentType - 1]}
            />
          </div>
          <Terms />
        </div>
      </div>
    </div>
  );
}
