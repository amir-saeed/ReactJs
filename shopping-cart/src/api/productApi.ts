import axios from "axios";
import { Product } from "../types";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsFromAPI = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

export const fetchProductCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_URL}/products/categories`);
  return response.data;
};
