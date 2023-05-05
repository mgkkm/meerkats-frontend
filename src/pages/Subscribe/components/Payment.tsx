import React from 'react';

export default function Payment() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xl font-semibold py-5">Payment Method</p>
        <select className="select select-bordered w-full max-w-xs focus:outline-none">
          <option>Credit Card</option>
          <option>Debit Card</option>
        </select>
      </div>
      <div>
        <p className="text-xl font-semibold py-5">Payment Details</p>
        <div className="grid grid-cols-2 gap-x-32">
          {PAYMENT_DETAILS.map(({ id, detail, placeholder, width }) => {
            return (
              <div key={id}>
                <p>{detail}</p>
                <input
                  className={`w-${width} focus:outline-none focus:border-b-black border-2 border-x-transparent border-t-transparent border-b-mkLightGray mt-1 mb-5 placeholder:text-sm`}
                  type="input"
                  placeholder={placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PAYMENT_DETAILS = [
  {
    id: 1,
    detail: 'Card Number',
    placeholder: '0000 0000 0000 0000',
    width: 52,
  },
  {
    id: 1,
    detail: 'Name on Card',
    placeholder: 'Thomas Anderson',
    width: 24,
  },
  {
    id: 1,
    detail: 'Expiray Date',
    placeholder: 'MM / YYYY',
    width: 52,
  },
  {
    id: 1,
    detail: 'CVV',
    placeholder: '***',
    width: 24,
  },
  {
    id: 1,
    detail: 'Email',
    placeholder: 'example@gmail.com',
    width: 52,
  },
];
