import React from 'react';
import { useRecoilValue } from 'recoil';
import { warningAlert } from '../../../components/Alert/Modal';
import { currencyFormat } from '../../../components/CurrencyFormat/CurrencyFormat';
import { membershipState } from '../../../recoil/MembershipState';
import { subscribedMembershipIdState } from '../../../recoil/PaymentState';

type subscribeProps = {
  currentType: number;
  changeType(id: number): void;
};

export default function Option({ currentType, changeType }: subscribeProps) {
  const membershipData = useRecoilValue(membershipState);
  const subscribedMembershipId = useRecoilValue(subscribedMembershipIdState);

  const changeMembershipType = (id: number) => {
    if (subscribedMembershipId === null) {
      changeType(id);
    } else {
      changeType(id);
      if (subscribedMembershipId !== id) {
        warningAlert(
          'Would you like to change your membership?',
          `You are currently subscribed to ${
            membershipData[subscribedMembershipId - 1].name
          } membership. Please fill in the required fields and click the "Subscribe" button to change your membership.`
        );
      } else {
        warningAlert(
          'Would you like to update your payment method?',
          'Please fill in the required fields and click the "Subscribe" button to update your payment method.'
        );
      }
    }
  };

  return (
    <div>
      <p className="text-xl font-semibold py-5">Subscription Options</p>
      {membershipData.map(({ id, name, price, ticketProvision }) => {
        return (
          <div className="form-control" key={id}>
            <label
              className="label cursor-pointer sm:w-[28rem] max-sm:block"
              onClick={() => changeMembershipType(id)}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-mkOrange hover:border-mkOrange mr-7"
                  defaultChecked={currentType === id ? true : false}
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm">{`Get ${ticketProvision} FREE tickets ${
                    id === 3 && 'and MORE!'
                  }`}</p>
                </div>
              </div>
              <span className="ml-[3.25rem] font-semibold max-sm:mt-3">
                {currencyFormat(price)} / month
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
