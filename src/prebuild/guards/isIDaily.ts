import { IDaily } from '../../app/interfaces/IDaily';

export function isIDaily(x: any): x is IDaily {
  return typeof x.temp  !== "number";
}