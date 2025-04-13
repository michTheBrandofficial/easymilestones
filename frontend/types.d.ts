export { };

declare global {
  namespace App {
    
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