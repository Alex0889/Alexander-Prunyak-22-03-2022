export interface Minimum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Maximum {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Minimum: Minimum;
  Maximum: Maximum;
}

export interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  PrecipitationIntensity: string;
}

export interface DailyForecast {
  EpochDate: number;
  Temperature: Temperature;
  Day: Day;
}

export interface IForecas {
  DailyForecasts: DailyForecast[];
}
