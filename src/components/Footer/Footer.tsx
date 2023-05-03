import React from 'react';

export default function Footer() {
  return (
    <footer className="footer footer-center p-16 bg-white  text-primary-content h-1/4">
      <div>
        <img
          alt="logo"
          src="images/meerkat.png"
          className="inline-block fill-current w-16 h-16 text-black"
        />
        <p className="font-bold text-base text-black">
          mgkkm Industries Ltd. <br />
          Providing reliable tech since 2023
        </p>
        <p className="text-black mt-5">Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
}
