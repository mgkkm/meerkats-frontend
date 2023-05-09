import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  subscriptionFeeState,
  subscriptionTypeState,
} from '../../recoil/PaymentState';

import MembershipCard from '../Membership/components/MembershipCard';
import { MEMBERSHIP_CARD_DATA } from '../Membership/Membership';
import Option from './components/Option';
import PaymentInfo from './components/PaymentInfo';
import Terms from './components/Terms';
import SubscribeBtn from './components/SubscribeBtn';

export default function Subscribe() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedType = params.id;

  const [currentType, setCurrentType] = useState(Number(selectedType));
  const setSubscriptionType = useSetRecoilState(subscriptionTypeState);
  const setSubscriptionFee = useSetRecoilState(subscriptionFeeState);

  const changeType = (id: number) => {
    setCurrentType(id);
    navigate(`/membership/subscribe/${id}`);
  };

  useEffect(() => {
    setSubscriptionFee(
      parseInt(MEMBERSHIP_CARD_DATA[currentType - 1].price.replace(',', ''))
    );
    setSubscriptionType(
      MEMBERSHIP_CARD_DATA[currentType && currentType - 1].type
    );
  }, [currentType]);

  return (
    <div className="container xl pt-24">
      <div className="bg-white pt-24 px-14 pb-10 flex justify-center gap-44 max-lg:block">
        <div className="subscriptionLeft max-lg:mb-10">
          <p className="text-3xl font-semibold">Subscribe meerkats!</p>
          <div className="py-10 text-mkDarkGray flex flex-col gap-10">
            <Option currentType={currentType} changeType={changeType} />
            <PaymentInfo />
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
          <div className="flex justify-center mt-10 mb-10 lg:justify-end">
            <SubscribeBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
