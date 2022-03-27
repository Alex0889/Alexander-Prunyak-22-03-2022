import { IId } from './IId';
import { IWeather } from './IWeather';
import { IMain } from './IMain';
import { IWind } from './IWind';

export interface IEntity extends IId {
  readonly coord: {
    readonly lon: number;
    readonly lat: number;
  }
  readonly weather: IWeather[];
  readonly main: IMain;
  readonly wind: IWind;
  readonly name: string;
  readonly cod: number;
}
