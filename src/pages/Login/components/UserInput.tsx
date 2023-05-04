import React from 'react';

interface UserInputProps {
  id: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  margin: boolean;
}

export const UserInput = (props: UserInputProps) => {
  const {
    id,
    type,
    placeholder,
    name,
    value,
    handleInput,
    margin = false,
  } = props;

  return (
    <div className="block">
      <input
        id={id}
        className={`input input-bordered w-1/3 h-14 ${margin ? 'mt-3' : ''}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
};
