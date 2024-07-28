

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',  // Default theme
};

const displaySettingsSlice = createSlice({
  name: 'displaySettings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = displaySettingsSlice.actions;
export default displaySettingsSlice.reducer;
