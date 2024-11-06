import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductItems = createAsyncThunk("fetchProducts", async () => {
  const response = await axios.get(
    "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products"
  );
  const data = response.data;
  return data;
});

export const addProducts = createAsyncThunk(
  "addProducts",
  async (newProduct, thunkApi) => {
    try {
      const res = await axios.post(
        "https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products",
        newProduct
      );
      thunkApi.dispatch(fetchProductItems());
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue();
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "deleteProducts",
  async (id, thunkApi) => {
    try {
      await axios.delete(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products/${id}`
      );
      thunkApi.dispatch(fetchProductItems());

      return id;
    } catch (error) {
      return error.message;
    }
  }
);
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
export const updateProducts = createAsyncThunk(
  "updateProducts",
  async ({ id, ...updatedProduct }, thunkApi) => {
    console.log(id);
    try {
      await axios.put(
        `https://66fcde2bc3a184a84d1834e8.mockapi.io/api/users/products/${id}`,
        updatedProduct
      );

      thunkApi.dispatch(fetchProductItems());
      return { id, updatedProduct };
    } catch (error) {
      return error.message;
    }
  }
);

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
    //Update
    builder
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.isSnackbarOpen = true;
        state.snackbarMessage = `Düzəliş olundu:  ${action.payload.name}`;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.products = action.payload?.message;
      });
  },
});

export const { closeSnackbar } = productSlice.actions;

export default productSlice.reducer;
