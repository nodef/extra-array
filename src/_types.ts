export type combineFn = (...as: any[]) => any;
export type compareFn<T> = (a: T, b: T) => number;
export type mapFn<T, U> = (v: T, i: number, x: T[]) => T|U;
export type testFn<T> = (v: T, i: number, x: T[]) => boolean;
export type getFn<T> = () => T;
