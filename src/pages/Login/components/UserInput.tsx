import React, { memo } from 'react';

interface UserInputProps {
  id: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  margin: boolean;
  handleSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const UserInput = memo((props: UserInputProps) => {
  const {
    id,
    type,
    placeholder,
    name,
    value,
    handleInput,
    margin = false,
    handleSubmit,
  } = props;

  // 비밀번호 input 에 복사, 붙여넣기, 자르기 금지시키는 함수
  const doNotHandlePw = (e: any) => {
    margin && e.preventDefault();
  };

  return (
    <div className="block">
      <input
        id={id}
        className={`input input-bordered w-[75%] xs:w-[90%] sm:w-[60%] md:w-[70%] lg:w-[60%] h-12 xs:h-14 placeholder:text-sm sm:placeholder:text-base ${
          margin ? 'mt-2 sm:mt-3' : ''
        }`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onKeyDown={handleSubmit}
        onChange={handleInput}
        onPaste={doNotHandlePw}
        onCopy={doNotHandlePw}
        onCut={doNotHandlePw}
      />
    </div>
  );
});
