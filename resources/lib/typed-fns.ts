export function typedObjectKeys<T extends object>(keys: T) {
  return Object.keys(keys) as (keyof typeof keys)[];
}

export function includes<T extends U, U>(coll: readonly T[], el: U): el is T {
  return coll.includes(el as T);
}
