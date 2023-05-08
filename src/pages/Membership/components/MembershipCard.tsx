import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MembershipCardData } from '../Membership';

interface MembershipCardProps {
  membership: MembershipCardData;
}

export default function MembershipCard({ membership }: MembershipCardProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const isSubscribe = pathname.split('/')[2] === 'subscribe' ? true : false;

  const { id, type, price, content, benefit } = membership;

  const navigate = useNavigate();

  return (
    <div
      className="card w-80 sm:w-96 lg:w-80 xl:w-96 max-lg:mb-10 bg-base-100 shadow-xl "
      key={id}
    >
      <figure>
        <div className="h-64 relative">
          <img
            src={`/images/membership/membership${id}.jpg`}
            className="w-full"
            alt="img"
          />
        </div>
        <div className="flex flex-col items-center absolute top-7">
          <img src="/images/logo_b.png" className="w-1/4" alt="meerkats" />
          <div className="flex flex-col items-center mt-10">
            <p className="text-2xl font-black text-black">{type} membership</p>
            <p className="text-black whitespace-pre-line text-center mt-2">
              {content}
            </p>
            <p className="text-lg font-semibold text-black mt-5">
              ₩ {price} / month
            </p>
          </div>
        </div>
      </figure>
      <div className={`card-body ${isSubscribe === true ? 'h-40' : ''}`}>
        {benefit.map(({ id, content }) => {
          return (
            <p className="max-sm:text-sm lg:text-sm xl:text-base" key={id}>
              • {content}
            </p>
          );
        })}
        <div
          className={`card-actions justify-end ${
            isSubscribe === true
              ? 'max-sm:mt-[450px] max-lg:mt-[400px] max-lg:justify-center max-lg:-right-20 lg:mt-[480px] xl:mt-96'
              : 'mt-7'
          }`}
        >
          <button
            className="btn bg-mkOrange border-none hover:bg-mkDarkOrange hover:border-none"
            onClick={() => {
              navigate(`/membership/subscribe/${id}`);
            }}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
}
