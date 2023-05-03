import React from 'react';

export default function EmailInput() {
  return (
    <div className="relative">
      <div className="border-2 border-solid border-black  w-3/5 h-[388px] absolute top-7 left-1/4"></div>
      <div className="border border-solid border-black text-center py-28 w-3/5 m-auto">
        <p className="mb-10 font-normal text-3xl">
          Sign up for news about <br />
          movie event from Meerkats.
        </p>
        <input
          type="text"
          placeholder="Enter Your Email"
          className="input input-bordered w-1/2 rounded-none	"
        />
        <button className="btn bg-black p-3.5 text-white rounded-none	w-20">
          SEND
        </button>
      </div>
    </div>
  );
}
