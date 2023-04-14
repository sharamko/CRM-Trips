import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'state',
  initialState: {
    user: null,
    userInfo: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export default slice.reducer;
export const { setUser, setUserInfo } = slice.actions;
