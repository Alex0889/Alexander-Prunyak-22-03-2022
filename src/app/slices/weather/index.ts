import { createSlice } from '@reduxjs/toolkit';
import { getWeather } from './thunk/getWeather';
import { getForecast } from './thunk/getForecast';
// import { IEntity } from '../../interfaces/IEntity';
// import { IForecast } from '../../interfaces/IForecast';
import { toast } from 'react-toastify';
import { ICurrentWeater } from '../../interfaces/ICurrentWeater';
import { IForecast } from '../../interfaces/IForecast';

interface WeatherState {
  readonly current: {
    readonly weather: ICurrentWeater[] | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
  readonly forecast: {
    readonly weather: IForecast | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
}

const initialState: WeatherState = {
  current: {
    weather: null,
    isLoading: false,
    error: undefined,
  },
  forecast: {
    weather: null,
    isLoading: false,
    error: undefined,
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, ({ current }) => {
        current.isLoading = true;
      })
      .addCase(getWeather.fulfilled, ({ current }, { payload }) => {
        current.weather = payload;
        current.isLoading = false;
      })
      .addCase(getWeather.rejected, ({ current }, { error }) => {
        current.error = error.message;
        toast.error(error.message);
        current.isLoading = false;
      });
    builder
      .addCase(getForecast.pending, ({ forecast }) => {
        forecast.isLoading = true;
      })
      .addCase(getForecast.fulfilled, ({ forecast }, { payload }) => {
        forecast.weather = payload;
        forecast.isLoading = false;
      })
      .addCase(getForecast.rejected, ({ forecast }, { error }) => {
        forecast.error = error.message;
        toast.error(error.message);
        forecast.isLoading = false;
      });
  },
});

export default weatherSlice.reducer;