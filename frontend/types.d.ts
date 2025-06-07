import { Status } from "./lib/utils";

export {};

declare global {
  interface Transaction {
    /**
     * @dev timestamp is the day when the transaction was created, this would be the block.timestamp, calculated by the contract not the frontend.
     */
    created_at: number;
    amount: number;
    final_deadline: number;
    title: string;
    milestones: Milestone[];
  }

  interface Milestone {
    amount: number;
    deadline: number;
    title: string;
    /**
     * This will only come after milestone is completed.
     */
    tx_hash?: `0x${string}`;
    status: Status;
  }

  namespace Helpers {
    type Keyof<T extends Record<any, any>> = keyof T;

    type Mutable<T extends Record<string, any>> = {
      -readonly [key in keyof T]: T[key];
    };

    // Helper type to create a range union from 1 to N
    type BuildTuple<N extends number, Acc extends unknown[] = []> = 
      Acc['length'] extends N 
        ? Acc 
        : BuildTuple<N, [...Acc, unknown]>;
        
    type Add1<N extends number> = [...BuildTuple<N>, unknown]['length'];
    
    type Steps<N extends number, Current extends number = 1> = 
      Current extends N 
        ? Current 
        : Current | Steps<N, Add1<Current>>;
  }

  namespace Utilities {
    type FunctionWithArgs = (...args: Array<any>) => void;
  }
}
