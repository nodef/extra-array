export type combineFn<T, U> = (...as: T[]) => U;
export type compareFn<T> = (a: T, b: T) => number;
export type mapFn<T, U> = (v: T, i: number, x: T[]) => U;
export type testFn<T> = (v: T, i: number, x: T[]) => boolean;
export type getFn<T> = () => T;
