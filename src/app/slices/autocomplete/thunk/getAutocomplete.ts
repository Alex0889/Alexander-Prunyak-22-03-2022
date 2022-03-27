import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAutocomplete } from '../../../interfaces/IAutocomplete';
import { Exception } from '../../../createException';
import { AutocompleteApi } from './AutocompleteApi';

export const getAutocomplete = createAsyncThunk(
  'getAutocomplete',
  async (city: string) => {
    return await AutocompleteApi.GET<IAutocomplete[]>('autocomplete', [
      { name: 'apikey', value: process.env.REACT_APP_API_KEY as string },
      { name: 'q', value: city },
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
  });
