import { createAsyncThunk } from '@reduxjs/toolkit';
import { Exception } from '../../../createException';
import { IGeolocation } from '../../../interfaces/IGeolocation';
import { GeolocationApi } from './GeolocationApi';
import { RootState } from '../../../store';

export const getGeolocation = createAsyncThunk(
  'getGeolocation',
  async (_, { getState }) => {
    const { geolocation: {latitude, longitude} } = getState() as RootState;
    return await GeolocationApi.GET<IGeolocation>('geoposition/search', [
      { name: 'apikey', value: process.env.REACT_APP_API_KEY as string },
      { name: 'q', value: `${latitude},${longitude}` },
    ]);
  },
  {
    serializeError: x => {
      const exception = x as Exception;

      return {
        code: exception.key,
        message: exception.details,
      };
    },
  },
);