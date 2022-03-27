import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGeolocation } from './thunk/getGeolocation';
import { storage } from 'prebuild/helpers/storage';
import { toast } from 'react-toastify';
import { IGeolocation } from '../../interfaces/IGeolocation';

interface GeolocationState {
  readonly geolocation: {
    readonly geolocation: IGeolocation | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
  readonly city: string;
  readonly longitude: number | null;
  readonly latitude: number | null;
  readonly key: string;
}

const initialState: GeolocationState = {
  geolocation: {
    geolocation: null,
    isLoading: false,
    error: undefined,
  },
  city: storage.getItem('city') || '',
  longitude: 34.7817676,
  latitude: 32.0852999,
  key: '215793',
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    changeCity: (state, { payload }: PayloadAction<string>) => {
      state.city = payload;
    },
    changeKey: (state, { payload }: PayloadAction<string>) => {
      state.key = payload;
    },
    setGeolocation: (state, { payload }: PayloadAction<GeolocationCoordinates>) => {
      state.longitude = payload.longitude;
      state.latitude = payload.latitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocation.pending, ({ geolocation }) => {
        geolocation.isLoading = true;
      })
      .addCase(getGeolocation.fulfilled, (state, { payload }) => {
        state.geolocation.geolocation = payload;
        state.city = payload.ParentCity.LocalizedName;
        state.key = payload.ParentCity.Key;
        state.geolocation.isLoading = false;
        storage.setItem('city', payload.ParentCity.LocalizedName);
        storage.setItem('cityKey', payload.ParentCity.Key);
      })
      .addCase(getGeolocation.rejected, ({ geolocation }, { error }) => {
        geolocation.error = error.message;
        toast.error(error.message);
        geolocation.isLoading = false;
      });
  },
});

export const { changeCity, changeKey, setGeolocation } = geolocationSlice.actions;

export default geolocationSlice.reducer;