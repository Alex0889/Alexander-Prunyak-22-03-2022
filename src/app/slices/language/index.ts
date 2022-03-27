import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../../prebuild/helpers/storage';
import { Lang } from '../../enum/Lang';

interface languageState {
  lang: Lang;
}

const initialState: languageState = {
  lang: storage.getItem('lang') || Lang.EN,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, { payload }) => {
      state.lang = payload;
      storage.setItem('lang', payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;