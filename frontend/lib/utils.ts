import { CSSProperties } from "react";

/**
 * Scales the size of a dimension based on a given size multiplier
 * @param size A scaling factor (typically 1 or a number)
 * @param width The original width to be scaled
 * @param height The original height to be scaled
 * @returns A tuple of scaled width and height
 */
export const scaleSize = <T extends string | number>(
  size: 1 | (number & {}),
  {
    width,
    height,
  }: {
    width: T;
    height: T;
  }
) => {
  const [w, h] = [width, height].map((dim) => Number(dim) * size);
  return [w, h] as [number, number];
};

export const px = <V extends string | number>(value: V): `${V}px` =>
  `${value}px`;

export const deg = <V extends string | number>(value: V): `${V}deg` =>
  `${value}deg`;

export const sec = <V extends string | number>(value: V): `${V}s` =>
  `${value}s`;

export const percentage = <V extends string | number>(value: V): `${V}%` =>
  `${value}%`;

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

export const noop = (...args: any[]) => undefined;

export const toReversed = (arr: any[]) => structuredClone(arr).reverse();

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

type CaseArray<C, R> = [C, R];

/**
 * @dev take this as an inline switch
 */
export function inlineSwitch<Check, Case extends Check, Return>(
  check: Check,
  ...caseArrays: Array<CaseArray<Case, Return>>
) {
  let pickedReturn: Return | undefined = undefined;
  for (let i = 0; i < caseArrays.length; i++) {
    const caseArray = caseArrays[i];
    if (caseArray[0] === check) {
      pickedReturn = caseArray[1];
      break;
    }
  }
  return pickedReturn;
}

/**
 * Formats an Ethereum address by displaying the first 6 characters and the last 4 characters, with the middle characters replaced by asterisks.
 *
 * @param address - A valid Ethereum address in the format `0x...`.
 * @returns The formatted Ethereum address.
 * @throws {Error} If the input address is not 42 characters long.
 */
export function formatEthAddress(
  address: `0x${string}`,
  middleChars: "star" | "ellipsis" = "ellipsis"
) {
  if (address.length !== 42) throw new Error("Invalid address passed!");
  return `${address.slice(0, 6)}${inlineSwitch(
    middleChars,
    ["star", "****"],
    ["ellipsis", "...."]
  )}${address.slice(-4)}`;
}
