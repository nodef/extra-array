export type compareFn<T> = (a: T, b: T) => number;
export type calledFn<T>  = (v: T, i: number, x: T[]) => void;
export type testFn<T>    = (v: T, i: number, x: T[]) => boolean;
export type mapFn<T, U>  = (v: T, i: number, x: T[]) => T|U;
export type getFn<T>     = () => T;
