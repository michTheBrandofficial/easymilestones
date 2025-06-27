/**
 * Should be used to match errors in a catch block
 * @example
 * ```jsx
 * ErrorMatcher
 *  .use(err).match(TypeError, () => {
 *  // do something
 * })
 * ```
 */
export class ErrorMatcher {
  private static error: unknown;
  static use(error: unknown) {
    this.error = error;
    return this;
  }
  static match<E extends Error>(
    errorConstructor: new (...args: any[]) => E,
    fn: (errorAsTypedError: E) => void
  ) {
    if (this.error) {
      if (
        Object.is((this.error as any).name, errorConstructor.name) &&
        (this.error as any) instanceof errorConstructor
      ) {
        fn(this.error as E);
        this.cleanup();
      }
    }
    return this;
  }
  private static cleanup() {
    this.error = null;
  }
}