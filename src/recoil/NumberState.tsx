import { atomFamily, selectorFamily } from 'recoil';
import { toggleState } from './ToggleState';

export const numberState = atomFamily<number, string>({
  key: 'numberState',
  default: undefined,
});

export const numberSelector = selectorFamily({
  key: 'numberSelector',
  get:
    (type: string) =>
    ({ get }) => {
      return get(numberState(`${type}`));
    },
  set:
    (type: string) =>
    ({ get, set }, newValue) => {
      const prevValue = get(numberState(`${type}`));
      if (prevValue === undefined) {
        set(numberState(`${type}`), newValue);
      } else {
        get(toggleState(`${type}`)) === true
          ? set(numberState(`${type}`), prevValue - 1)
          : set(numberState(`${type}`), prevValue + 1);
      }
    },
});
