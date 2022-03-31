import { createAsyncThunk } from '@reduxjs/toolkit';
import { Exception } from '../../../createException';
import { FavoritesApi } from './FavoritesApi';
import { storage } from 'prebuild/helpers/storage';
import { IForecast } from '../../../interfaces/IForecast';
import { IFavorites } from 'prebuild/interfaces/IFavorites';


export const getFavorites = createAsyncThunk(
  'getFavorites',
  async () => {
    const keys = (storage.getItem('favorites') as IFavorites[]).map(item => item.key);
    const results = await Promise.allSettled(keys.map(async key => {
      const value = await FavoritesApi.GET<IForecast>(key,
        [
          { name: 'apikey', value: process.env.REACT_APP_API_KEY as string },
          { name: 'details', value: true },
        ]);
      return { key, value };
    }));
    return results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return null;
    });
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