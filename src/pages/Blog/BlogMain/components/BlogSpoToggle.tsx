import { memo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toggleSelector } from '../../../../recoil/ToggleState';
import { myBlogBtnState } from '../../../../recoil/MyBlogBtnState';

export const BlogSpoToggle = memo(() => {
  const [toggle, setToggle] = useRecoilState(toggleSelector('spo'));
  const myBlogBtn = useRecoilValue(myBlogBtnState);

  return (
    <div className={`spo-toggle ${myBlogBtn ? 'hidden' : 'inline-block'} mx-6`}>
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
