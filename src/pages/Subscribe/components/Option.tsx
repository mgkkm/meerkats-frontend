import React from 'react';
import { MEMBERSHIP_CARD_DATA } from '../../Membership/Membership';

type subscribeProps = {
  currentType: number;
  changeType(id: number): void;
};

export default function Option({ currentType, changeType }: subscribeProps) {
  return (
    <div>
      <p className="text-xl font-semibold py-5">Subscription Options</p>
      {MEMBERSHIP_CARD_DATA.map(({ id, type, price, ticket }) => {
        return (
          <div className="form-control" key={id}>
            <label
              className="label cursor-pointer sm:w-[28rem] max-sm:block"
              onClick={() => {
                changeType(id);
              }}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-mkOrange hover:border-mkOrange mr-7"
                  defaultChecked={currentType === id ? true : false}
                />
                <div>
                  <p className="font-semibold">{type}</p>
                  <p className="text-sm">{`Get ${ticket} FREE tickets ${
                    id === 3 && 'and MORE!'
                  }`}</p>
                </div>
              </div>
              <span className="ml-[3.25rem] font-semibold max-sm:mt-3">
                ₩ {price} / month
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
