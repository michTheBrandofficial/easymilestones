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
  },
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

// @ts-ignore
export const noop = (...args: any[]) => undefined;

export const toReversed = (arr: any[]) => structuredClone(arr).reverse();

/**
 * 
 * @param str 
 * @param desiredLength length of string (ellipsis excluded)
 */
export const truncate = (str: string, desiredLength: number) => {
  if (str.length <= desiredLength) return str;
  return str.slice(0, desiredLength).trimEnd() + "...";
} 

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

export function last<T>(value: T[]): T;

export function last(value: string): string;

export function last<T>(value: T[] | string) {
  return value[value.length - 1];
}

type CaseArray<C, R> = [C, R];

/**
 * @dev take this as an inline switch
 * @param check the value to check
 * @param cases the cases to check against
 * @returns the return value of the case that matches the check
 */
export function inlineSwitch<Check, Case extends Check, Return>(
  check: Check,
  ...cases: Array<CaseArray<Case, Return> | { default: Return }>
) {
  let pickedReturn: Return | undefined = undefined;
  // separate the default case objects from the and return the a destructured array of [defaultCases, caseArrays]
  const [defaultCases, caseArrays] = cases.reduce(
    (acc, caseArray) => {
      if (Array.isArray(caseArray)) {
        acc[1].push(caseArray);
      } else {
        acc[0].push(caseArray);
      }
      return acc;
    },
    [[], []] as [{ default: Return }[], CaseArray<Case, Return>[]]
  );

  for (let i = 0; i < caseArrays.length; i++) {
    const caseArray = caseArrays[i];
    if (caseArray[0] === check) {
      pickedReturn = caseArray[1];
      break;
    }
  }
  if (pickedReturn === undefined && defaultCases.length > 0)
    pickedReturn = last(defaultCases).default;
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

type DeepCopyable = any;

/**
 * @dev deep copies any javascript value
 */
export function deepCopy<T extends DeepCopyable>(value: T): T {
  // Handle null and undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle functions
  if (typeof value === "function") {
    return function (this: any, ...args: any[]) {
      return value.apply(this, args);
    } as T;
  }

  // Handle Dates
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Handle Arrays
  if (Array.isArray(value)) {
    return value.map((item) => deepCopy(item)) as T;
  }

  // Handle Sets
  if (value instanceof Set) {
    const newSet = new Set();
    value.forEach((item) => newSet.add(deepCopy(item)));
    return newSet as T;
  }

  // Handle Maps
  if (value instanceof Map) {
    const newMap = new Map();
    value.forEach((val, key) => newMap.set(deepCopy(key), deepCopy(val)));
    return newMap as T;
  }

  // Handle Objects
  if (typeof value === "object") {
    const result: Record<string, any> = {};

    Object.entries(value).forEach(([key, val]) => {
      result[key] = deepCopy(val);
    });

    return result as T;
  }

  // Handle primitives (strings, numbers, booleans)
  return value;
}

/**
 * converts bigint seconds example 1751126538n seconds to Date object by multiplying by 1000n and casting to number.
 * @dev this loses precision by the way.
 */
export function bigintSecondsToDate(bigint: bigint) {
  return new Date(Number(bigint * 1000n))
}

export enum Status {
  unpaid,
  paid,
}