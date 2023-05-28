import React, { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { validInputState } from '../../../recoil/PaymentState';

export default function Terms() {
  const [allValid, setAllValid] = useRecoilState(validInputState);

  const today = new Date();
  const day = today.getDate();

  const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return 'th';
    switch (number % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const renewalDay = day + nthNumber(day);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setAllValid({ ...allValid, autoRenewAgreement: e.target.checked });
  };

  return (
    <div className="mt-14 px-2 flex flex-col items-center">
      <div className="flex">
        <input type="checkbox" className="checkbox" onChange={handleCheckBox} />
        <p className="font-semibold ml-3">Auto-renew my membership MONTHLY</p>
      </div>
      <p className="text-sm text-mkGray mt-4 px-5">
        By Choosing auto-renew, you authorize meerkats to automatically charge
        the credit / debit card number listed on a monthly basis, at the
        then-current price for the membership category you have chosen. <br />
        No partial refunds. If you change your mind about auto-renewing, you can
        cancel at any time prior to the auto-renewal date by emailing us at
        meerkats@mgkkm.com.
      </p>
      <p className="text-sm text-mkGray mt-4 px-5">
        Date of purchase memberships start on the day that they were purchased
        on. Your membership will renew on the
      </p>
      <p className="text-md text-mkGray font-semibold mt-4">
        Renewal date: every&nbsp;
        {renewalDay} of a month.
      </p>
    </div>
  );
}
