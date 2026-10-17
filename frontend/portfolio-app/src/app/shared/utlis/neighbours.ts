export interface Neighbours<T> {
  readonly previous: T | null;
  readonly next: T | null;
}

/** Returns the items before and after the one matching `isCurrent` in list order. */
export function neighboursOf<T>(items: readonly T[], isCurrent: (item: T) => boolean): Neighbours<T> {
  const index = items.findIndex(isCurrent);
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : null,
  };
}