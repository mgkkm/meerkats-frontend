import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  subscribedMembershipIdState,
  subscriptionIdState,
} from '../../recoil/PaymentState';
import MembershipCard from '../Membership/components/MembershipCard';
import Option from './components/Option';
import PaymentInfo from './components/PaymentInfo';
import Terms from './components/Terms';
import SubscribeBtn from './components/SubscribeBtn';
import { membershipState } from '../../recoil/MembershipState';
import { MembershipData } from '../Membership/Membership';
import useAxios from '../../hooks/useAxios';

interface thisUserMembershipData {
  thisUserMembership: { membership_id: number } | null;
}

export default function Subscribe() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedType = params.id;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, error, data, fetchData] = useAxios();

  const token = sessionStorage.getItem('token');

  const [membershipData, setMembershipData] = useRecoilState(membershipState);

  const [currentType, setCurrentType] = useState(Number(selectedType));

  const setSubscriptionId = useSetRecoilState(subscriptionIdState);
  const setSubscribedMembershipId = useSetRecoilState(
    subscribedMembershipIdState
  );

  const changeType = (id: number) => {
    setCurrentType(id);
    navigate(`/membership/subscribe/${id}`);
  };

  useEffect(() => {
    if (membershipData[0].id === 0) {
      fetchData({
        url: `${BASE_URL}/membership`,
        headers: {
          'Content-Type': `application/json`,
        },
      }).then((result: MembershipData) => {
        if (result) {
          setMembershipData(result.data);
        }
      });
    } else {
      setSubscriptionId(membershipData[currentType && currentType - 1].id);
    }
  }, [membershipData, currentType]);

  useEffect(() => {
    token &&
      fetchData({
        url: `${BASE_URL}/membership`,
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': `application/json`,
        },
      }).then((result: thisUserMembershipData) => {
        if (result) {
          setSubscribedMembershipId(
            result.thisUserMembership?.membership_id ?? null
          );
        }
      });
  }, []);

  return (
    <div className="container xl pt-24">
      <div className="bg-white pt-24 pb-10 lg:flex justify-center xl:gap-36">
        <div className="subscriptionLeft max-lg:mb-10 max-md:pl-10 md:max-lg:pl-20 lg:pl-8">
          <p className="text-3xl font-semibold">Subscribe meerkats!</p>
          <div className="py-10 text-mkDarkGray flex flex-col gap-10">
            <Option currentType={currentType} changeType={changeType} />
            <PaymentInfo />
          </div>
        </div>
        <div className="subscriptionRight lg:w-96">
          <div className="flex justify-center">
            <MembershipCard
              key={currentType && currentType - 1}
              membership={membershipData[currentType && currentType - 1]}
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
