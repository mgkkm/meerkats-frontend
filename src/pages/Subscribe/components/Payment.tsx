import React, { useState } from 'react';

export default function Payment() {
  const [paymentBox, setPaymentBox] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Select');

  const paymentHandler = (payment: string) => {
    setPaymentBox(!paymentBox);
    setSelectedPayment(payment);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xl font-semibold py-5">Payment Method</p>
        <div
          className="dropdown cursor-pointer"
          onClick={() => setPaymentBox(!paymentBox)}
        >
          <label
            tabIndex={0}
            className="btn w-64 text-black flex justify-between bg-white border border-mkLightGray hover:bg-white hover:border hover:border-mkLightGray cursor-pointer"
          >
            <p>{selectedPayment}</p>
            <img
              src="/images/blog/blogMain/dropdown_arrow.png"
              alt="dropdown_arrow"
              className="w-3 ml-3"
            />
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content menu w-64 p-2 shadow bg-base-100 rounded-box ${
              paymentBox ? 'block' : 'hidden'
            }`}
          >
            {PAYMENT_METHOD.map(item => {
              return (
                <li
                  key={item.id}
                  className="text-sm cursor-pointer"
                  onClick={() => paymentHandler(item.method)}
                >
                  <a className="active:bg-mkLightGray rounded-md">
                    {item.method}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
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

const PAYMENT_METHOD = [
  { id: 1, method: 'CREDIT CARD' },
  { id: 2, method: 'DEBIT CARD' },
];
