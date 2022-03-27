import { IWeather } from './IWeather';

export interface ICurrent {
  readonly dt: number;
  readonly temp: number,
  readonly feels_like: number,
  readonly pressure: number,
  readonly humidity: number,
  readonly wind_speed: number,
  readonly wind_deg: number,
  readonly weather: IWeather[]
}