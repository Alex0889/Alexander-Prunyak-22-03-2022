import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'prebuild/helpers/storage';
import { Theme } from '../../enum/Theme';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: storage.getItem('theme') || Theme.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, {payload}) {
      state.theme = payload;
      storage.setItem('theme', state.theme);
    }
  }
});

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;