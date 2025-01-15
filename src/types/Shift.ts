/**
 * An array type with its first element removed.
 * @public
 */
export type Shift<T> = T extends [unknown, ...infer V] ? V : [];
