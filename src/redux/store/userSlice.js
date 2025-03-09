import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  car_prices: {},
  booking_details:{}
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
    setCarPrices: (state, action) => {
      state.car_prices = action.payload;
    },
    setBookingDetails: (state, action) => {
        state.booking_details = action.payload;
      },
  },
});

export const { setUser, clearUser, setCarPrices,setBookingDetails } = userSlice.actions;
export default userSlice.reducer;
