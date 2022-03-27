import { createSlice } from '@reduxjs/toolkit';
import { IAutocomplete } from '../../interfaces/IAutocomplete';
import { getAutocomplete } from './thunk/getAutocomplete';

interface AutocompleteState {
  readonly autocomplete: {
    readonly autocomplete: IAutocomplete[] | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
}

const initialState: AutocompleteState = {
  autocomplete: {
    autocomplete: null,
    isLoading: false,
    error: undefined,
  },
};

const autocompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {
    clearAutocomplete: (state) => {
      state.autocomplete.autocomplete = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutocomplete.pending, ({ autocomplete }) => {
        autocomplete.isLoading = true;
      })
      .addCase(getAutocomplete.fulfilled, ({ autocomplete }, { payload }) => {
        autocomplete.isLoading = false;
        autocomplete.autocomplete = payload;
      })
      .addCase(getAutocomplete.rejected, ({autocomplete}, {error}) => {
        autocomplete.isLoading = false;
        autocomplete.error = error.message;
      });
  },
});

export const {clearAutocomplete} = autocompleteSlice.actions;

export default autocompleteSlice.reducer;
