export interface ICurren {
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  Temperature: Temperature;
  RealFeelTemperature: RealFeelTemperature;
  Wind: Wind;
  Pressure: Pressure;
}

interface Temperature {
  Metric: Metric;
  Imperial: Imperial;
}

interface RealFeelTemperature {
  Metric: Metric;
  Imperial: Imperial;
}

interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

interface Speed {
  Metric: Metric;
  Imperial: Imperial;
}

interface Wind {
  Direction: Direction;
  Speed: Speed;
}

interface Pressure {
  Metric: Metric;
  Imperial: Imperial;
}

interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

interface Imperial {
  Value: number;
  Unit: string;
  UnitType: number;
}
