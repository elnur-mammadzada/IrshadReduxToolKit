import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TbRuler2Off } from "react-icons/tb";

export const fetchProductItems = createAsyncThunk("fetchProducts", async () => {
  const response = await axios.get(
    "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products"
  );
  const data = response.data;
  return data;
});

export const addProducts = createAsyncThunk(
  "addProducts",
  async (newProduct) => {
    try {
      const res = await axios.post(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products",
        newProduct
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteProducts = createAsyncThunk("deleteProducts", async (id) => {
  try {
    const res = await axios.delete(
      `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products/${id}`
    );
    return id;
  } catch (error) {
    return error.message;
  }
});
export const getUserById = createAsyncThunk("getUserByid", async (id) => {
  try {
    const res = await axios.get(
      `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products/${id}`
    );
    const data = res.data;
    return data;
  } catch (error) {
    return error.message;
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    isSnackbarOpen: false,
    snackbarMessage: "",
    userById: {},
  },
  reducers: {
    closeSnackbar: (state) => {
      state.isSnackbarOpen = false;
      state.snackbarMessage = "";
    },
  },
  extraReducers: (builder) => {
    // GET
    builder
      .addCase(fetchProductItems.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchProductItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(fetchProductItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // ADD
    builder
      .addCase(addProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Məhsul yaradıldı:  ${action.payload.name}`;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.products = action.payload?.message;
      });

    // DELETE
    builder
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Məhsul silindi:  ${action.payload}`;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
    //GETUSERBYID
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userById = action.payload;
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.isLoading = false;
      });
  },
});

export const { closeSnackbar } = productSlice.actions;

export default productSlice.reducer;
