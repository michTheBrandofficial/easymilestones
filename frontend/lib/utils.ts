import { CSSProperties } from "react";

export const getDims = ({ width, height }: CSSStyleDeclaration) => {
  return {
    width: Number(width.replace('px', '')),
    height: Number(height.replace('px', '')),
  };
};

export const px = <V extends string | number>(value: V): `${V}px` => `${value}px`;

export const deg = <V extends string | number>(value: V): `${V}deg` => `${value}deg`;

export const sec = <V extends string | number>(value: V): `${V}s` => `${value}s`;

export const percentage = <V extends string | number>(value: V): `${V}%` => `${value}%`;

export const createStyles = <
  Props extends CSSProperties,
  S extends {
    [index: string]: Readonly<Props>;
  }
>(
  styles: S
) => styles;

export const pick = <O extends Record<string, any>, K extends keyof O>(
  obj: O,
  ...keys: K[]
) => {
  const emptyObj = {} as Record<K, any>;
  keys.forEach((k) => (emptyObj[k] = obj[k]));
  return emptyObj;
};

export const round = Math.round;

export const noop = () => undefined;

export const toReversed = (arr: any[]) => structuredClone(arr).reverse()

/**
 * uses Promise.resolve() to wait for a given amount of time
 */
export const wait = async (delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), delay);
  });
};

export const debounce = <T extends VoidFunction | Utilities.FunctionWithArgs>(
  fn: T,
  delta = 500
): T => {
  let timer: any;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delta);
  }) as T;
};

export const removeChildren = (element: Element) => {
  Array.from(element.children).forEach((child) => child.remove());
};