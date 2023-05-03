import { atomFamily, selectorFamily } from 'recoil';

export const toggleState = atomFamily<boolean, string>({
  key: 'toggleState',
  default: undefined,
});

export const toggleSelector = selectorFamily({
  key: 'toggleSelector',
  get:
    (type: string) =>
    ({ get }) => {
      return get(toggleState(`${type}`));
    },
  set:
    (type: string) =>
    ({ get, set }, newState) => {
      const preState = get(toggleState(`${type}`));
      if (preState === undefined) {
        set(toggleState(`${type}`), newState);
      } else {
        set(toggleState(`${type}`), !get(toggleState(`${type}`)));
      }
    },
});
