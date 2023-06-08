import React, { memo } from 'react';

interface UserInputProps {
  id: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  margin: boolean;
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
  } = props;

  // 비밀번호 input 에 복사, 붙여넣기, 자르기 금지시키는 함수
  const doNotHandlePw = (e: any) => {
    margin && e.preventDefault();
  };

  return (
    <div className="block">
      <input
        id={id}
        className={`input input-bordered w-[75%] sm:w-1/3 h-12 sm:h-14 placeholder:text-sm sm:placeholder:text-base ${
          margin ? 'mt-2 sm:mt-3' : ''
        }`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInput}
        onPaste={doNotHandlePw}
        onCopy={doNotHandlePw}
        onCut={doNotHandlePw}
      />
    </div>
  );
});
