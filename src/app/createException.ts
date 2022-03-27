export type Exception = {
  readonly key: string;
  readonly details?: string;
}

export function createException(key: string, details?: string): Exception {
  return {
    key,
    details,
  };
}