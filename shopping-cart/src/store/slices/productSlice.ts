import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductState } from "../../types";
import {
  fetchProductCategories,
  fetchProductsFromAPI,
} from "../../api/productApi";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    return await fetchProductCategories();
  },
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsFromAPI();
  },
);

const initialState: ProductState = {
  items: [],
  categories: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle product fetching
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error fetching products";
      })

      // Handle category fetching
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Error fetching categories";
      });
  },
});

export default productSlice.reducer;
