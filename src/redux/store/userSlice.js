import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  is_authenticated: false,
  car_prices: {},
  booking_details: {},
  page_loader:false,
  booking_data:{}
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
    toggleAuthentication: (state, action) => {
      state.is_authenticated = action.payload;
    },
    togglePageLoader:(state, action) => {
      state.page_loader = action.payload;
    },
    updateBookingData:(state, action) => {
      state.booking_data = action.payload;
    },
    resetBookingData:(state) => {
      state.booking_data = {};
    },
  },
});

export const { setUser, clearUser, setCarPrices, setBookingDetails,toggleAuthentication ,togglePageLoader,updateBookingData,resetBookingData} =
  userSlice.actions;
export default userSlice.reducer;
