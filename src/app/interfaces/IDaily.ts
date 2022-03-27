import { IWeather } from './IWeather';

export interface IDaily {
  readonly dt: number;
  readonly temp: {
    readonly day: number;
    readonly night: number;
  },
  readonly feels_like: {
    readonly day: number;
  },
  readonly pressure: number;
  readonly humidity: number;
  readonly wind_speed: number;
  readonly wind_deg: number;
  readonly weather: IWeather[];
}