import { Status } from "./lib/utils";

export {};

declare global {
  interface Transaction {
    amount: number;
    deadline: number;
    title: string;
    milestones: Milestone[];
  }

  interface Milestone {
    amount: number;
    deadline: number;
    title: string;
    status: Status;
  }

  namespace Helpers {
    type Keyof<T extends Record<any, any>> = keyof T;

    type Mutable<T extends Record<string, any>> = {
      -readonly [key in keyof T]: T[key];
    };
  }

  namespace Utilities {
    type FunctionWithArgs = (...args: Array<any>) => void;
  }
}
