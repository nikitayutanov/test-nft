import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { LOCAL_STORAGE } from 'consts';
import clsx from 'clsx';

const isLoggedIn = ({ address }: InjectedAccountWithMeta) => localStorage[LOCAL_STORAGE.ACCOUNT] === address;

const cx = (...styles: string[]) => clsx(...styles);

const deepEqualProps = (objA: { [key: string]: any }, objB: { [key: string]: any }) => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== typeof objB) {
    return false;
  }

  if (typeof objA !== 'object') {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const isFinallyEqual = keysA.every((key) => {
    const valA = objA[key];
    const valB = objB[key];

    if (typeof valA === 'object') {
      return deepEqualProps(valA, valB);
    }

    return valA === valB;
  }) as boolean;

  return isFinallyEqual;
};

export { isLoggedIn, cx, deepEqualProps };
