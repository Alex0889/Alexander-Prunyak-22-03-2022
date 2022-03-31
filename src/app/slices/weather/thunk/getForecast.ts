import { createAsyncThunk } from '@reduxjs/toolkit';
// import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';
// import { IForecast } from '../../../interfaces/IForecast';
import { getWeather } from './getWeather';
// import { RootState } from '../../../store';
// import { IEntity } from '../../../interfaces/IEntity';
import { IForecast } from '../../../interfaces/IForecast';
import { Weather5DaysApi} from './WeatherApi';
import { RootState } from '../../../store';

export const getForecast = createAsyncThunk(
  'getForecastByCoords',
  async (_,
         {
           dispatch,
           getState,
         }) => {
    const { geolocation: { key } } = getState() as RootState;
    await dispatch(getWeather());
    return await Weather5DaysApi.GET<IForecast>(key,
      [
        { name: 'apikey', value: process.env.REACT_APP_API_KEY as string },
        { name: 'details', value: true },
      ],
    );
  },
  {
    serializeError: (x) => {
      const exception = x as Exception;

      return {
        code: exception.key,
        message: exception.details,
      };
    },
  },
);
