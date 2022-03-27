import { ICurrent } from './ICurrent';
import { IDaily } from './IDaily';

export interface IForecast {
  readonly lat: number;
  readonly lon: number;
  readonly timezone: string;
  readonly current: ICurrent;
  readonly hourly: ICurrent[];
  readonly daily: IDaily[];
  readonly cod?: number;
}