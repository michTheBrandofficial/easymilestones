import { Status } from "./lib/utils";

export {};

declare global {
  interface Transaction {
    /**
     * @dev timestamp is the day when the transaction was created, this would be the block.timestamp, calculated by the contract not the frontend.
     */
    created_at: bigint;
    amount: bigint;
    final_deadline: bigint;
    title: string;
    milestones: Milestone[];
  }

  interface Milestone {
    amount: bigint;
    deadline: bigint;
    title: string;
    /**
     * This will only come after milestone is completed.
     */
    tx_hash?: `0x${string}`;
    status: Status;
  }

  /**
   * Construct a type with the properties of T except for those in type K.
   */
  type Omit<T, K extends keyof T> = Helpers.Prettify<
    Pick<T, Exclude<keyof T, K>>
  >;

  namespace Helpers {
    type Keyof<T extends Record<any, any>> = keyof T;

    type Mutable<T extends Record<string, any>> = {
      -readonly [key in keyof T]: T[key];
    };

    type DeepMutable<T extends Record<string, any> | any[]> = T extends any[]
      ? Array<DeepMutable<T[number]>>
      : {
          -readonly [key in keyof T]: T[key] extends Record<
            string | number,
            any
          >
            ? DeepMutable<T[key]>
            : T[key];
        };

    // Helper type to create a range union from 1 to N
    type BuildTuple<
      N extends number,
      Acc extends unknown[] = [],
    > = Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>;

    type Add1<N extends number> = [...BuildTuple<N>, unknown]["length"];

    type Steps<N extends number, Current extends number = 1> = Current extends N
      ? Current
      : Current | Steps<N, Add1<Current>>;

    // make a prettify type
    type Prettify<T> = {
      [K in keyof T]: T[K];
    } & {};

    type NonNullableKey<T extends {}, K extends keyof T> = Prettify<
      Omit<T, K> & {
        [index in K]: NonNullable<T[K]>;
      }
    >;

    type NullableKey<T extends {}, K extends keyof T> = Prettify<
      Omit<T, K> & {
        [index in K]: T[K] | null;
      }
    >;
  }

  namespace Utilities {
    type FunctionWithArgs = (...args: Array<any>) => void;
  }
}
