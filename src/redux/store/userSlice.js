import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  car_prices:{}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setCarPrices: (state,action) => {
        state.car_prices =action.payload;
      },
  },
});

export const { setUser, clearUser,setCarPrices } = userSlice.actions;
export default userSlice.reducer;
