const Footer = () => {
  return (
    <div className="p-8 xs:p-11 sm:p-14 bg-white text-center text-primary-content">
      <div>
        <img
          alt="logo"
          src="/images/meerkat.png"
          className="inline-block fill-current w-12 h-12 sm:w-16 sm:h-16 text-black mb-5"
        />
        <p className="font-bold text-base text-black">
          mgkkm Industries Ltd. <br />
          Providing reliable tech since 2023
        </p>
        <p className="text-sm sm:text-base text-black mt-3 sm:mt-5">
          Copyright © 2023 - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
