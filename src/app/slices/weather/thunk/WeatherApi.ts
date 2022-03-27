import Api from '../../../Api';

export const WeatherApi = new Api(process.env.REACT_APP_WEATHER_API_URL as string);
export const Weather5DaysApi = new Api(process.env.REACT_APP_WEATHER_API_5DAYS_URL as string);