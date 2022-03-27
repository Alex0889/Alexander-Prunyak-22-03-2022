import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getFavorites } from './thunks/getFavorites';
import { IForecas } from '../../interfaces/IForecas';

interface favoritesState {
  readonly favorites: {
    readonly favorites: (
      {
        key: string;
        value: IForecas
      } | null)[],
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
}

const initialState: favoritesState = {
  favorites: {
    favorites: [],
    isLoading: false,
    error: undefined,
  },
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, ({ favorites }) => {
        favorites.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, ({ favorites }, { payload }) => {
        favorites.favorites = payload;
        favorites.isLoading = false;
      })
      .addCase(getFavorites.rejected, ({ favorites }, { error }) => {
        favorites.error = error.message;
        toast.error(error.message);
        favorites.isLoading = false;
      });
  },
});

export default favoritesSlice.reducer;