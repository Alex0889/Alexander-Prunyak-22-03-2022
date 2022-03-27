import { IId } from './IId';

export interface IWeather extends IId {
  readonly main: string,
  readonly description: string,
  readonly icon: string,
}