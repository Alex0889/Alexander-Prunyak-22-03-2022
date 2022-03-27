import { createAsyncThunk } from '@reduxjs/toolkit';
import { Exception } from '../../../createException';
import { RootState } from '../../../store';
import { ICurren } from '../../../interfaces/ICurren';
import { WeatherApi } from './WeatherApi';


export const getWeather = createAsyncThunk(
  'getWeather',
  async (_, { getState }) => {
    const { geolocation: { key } } = getState() as RootState;
    return await WeatherApi.GET<ICurren[]>(key,
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