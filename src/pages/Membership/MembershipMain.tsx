import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currencyFormat } from '../../components/CurrencyFormat/CurrencyFormat';
import useAxios from '../../hooks/useAxios';
import { membershipState } from '../../recoil/MembershipState';
import { MembershipData } from './Membership';

export default function MembershipMain() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, error, data, fetchData] = useAxios();

  const [currentTab, setCurrentTab] = useState(2);
  const [membershipData, setMembershipData] = useRecoilState(membershipState);

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
    }
  }, []);

  return (
    <div className="container xl">
      <div
        className="mb-14 hover:cursor-pointer"
        onClick={() => navigate('/membership')}
      >
        <p className="text-center font-[ChosunGs] xl:text-4xl xl:mb-20 sm:mb-10 sm:text-2xl xs:text-lg xs:mb-5">
          Enjoy the benefits of the meerkats membership!
        </p>
        <p className="text-lg flex justify-center text-mkGray mt-3">
          Choose the plan that suits you best
        </p>
      </div>
      <div className="max-[1100px]:block lg:w-full flex justify-center gap-16 lg:gap-10 xl:gap-16">
        {membershipData?.map(({ id, name, price, content }) => {
          return (
            <div
              key={id}
              className="h-80 flex justify-center items-center"
              onClick={() => setCurrentTab(id)}
            >
              <div
                className={`${
                  currentTab === id
                    ? 'opacity-100 w-[22.5rem] h-72 duration-300'
                    : 'opacity-40 w-80 h-64 duration-300'
                } flex flex-col justify-center rounded-2xl bg-white border-[2.5px] border-black shadow-2xl hover:cursor-pointer hover:border-mkOrange`}
                onClick={() =>
                  currentTab === id && navigate(`/membership/subscribe/${id}`)
                }
              >
                <p className="text-4xl flex justify-center font-black">
                  {name}
                </p>
                <div className="w-2/3 h-[2.5px] mx-auto my-5 bg-black" />
                <p className="text-ml text-mkGray flex justify-center text-center whitespace-pre-line">
                  {content}
                </p>
                <div className="flex justify-center items-baseline gap-1">
                  <p className="mt-5 text-3xl flex justify-center font-semibold">
                    {currencyFormat(price)}
                  </p>
                  <p className="text-lg font-semibold">/ month</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
