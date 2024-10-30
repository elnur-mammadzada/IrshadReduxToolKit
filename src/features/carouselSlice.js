import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarouselItems = createAsyncThunk("fetchItems", async () => {
  const response = await axios.get(
    "https://mocki.io/v1/dad0c53a-9a95-4ecb-a571-ef2c68c1699b"
  );
  return response.data.products;
});

export const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    currentIndex: 0,
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    nextSlide: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.items.length;
    },
    prevSlide: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.items.length) % state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarouselItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCarouselItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { nextSlide, prevSlide } = carouselSlice.actions;
export default carouselSlice.reducer;
