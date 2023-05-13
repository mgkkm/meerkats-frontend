import { memo } from 'react';
import { useRecoilState } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';

export const BlogSpoToggle = memo(() => {
  const [toggle, setToggle] = useRecoilState(toggleSelector('spo'));

  return (
    <div className="spo-toggle inline-block mx-6">
      <label className="label">
        <span
          className={`label-text text-xl font-semibold mr-3 ${
            toggle ? 'text-mkOrange' : 'text-mkLightGray'
          }`}
        >
          스포
        </span>
        <input
          type="checkbox"
          className={`toggle toggle-lg ${
            toggle ? 'checked bg-mkOrange border-mkOrange' : ''
          }`}
          onClick={() => setToggle(true)}
        />
      </label>
    </div>
  );
});
