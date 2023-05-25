import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { currencyFormat } from '../../../components/CurrencyFormat/CurrencyFormat';
import { MembershipCardData } from '../Membership';

interface MembershipCardProps {
  membership: MembershipCardData;
}

export default function MembershipCard({ membership }: MembershipCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const isSubscribe = pathname.split('/')[2] === 'subscribe' ? true : false;

  const { id, name, price, content, benefit } = membership ?? {};

  const benefitArray = benefit?.split('|');

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
            <p className="text-2xl font-black text-black">{name} membership</p>
            <p className="text-black whitespace-pre-line text-center mt-2">
              {content}
            </p>
            <p className="text-lg font-semibold text-black mt-5">
              {currencyFormat(price)} / month
            </p>
          </div>
        </div>
      </figure>
      <div className={`card-body ${isSubscribe === true ? 'h-40' : ''}`}>
        {benefitArray?.map((content, idx) => {
          return (
            <p className="max-sm:text-sm lg:text-sm xl:text-base" key={idx}>
              • {content}
            </p>
          );
        })}
        {!isSubscribe && (
          <div className="card-actions justify-end mt-7">
            <button
              className="btn bg-mkOrange border-none hover:bg-mkDarkOrange hover:border-none"
              onClick={() => {
                navigate(`/membership/subscribe/${id}`);
              }}
            >
              SUBSCRIBE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
