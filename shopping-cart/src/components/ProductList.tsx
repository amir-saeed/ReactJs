import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchProducts } from "../store/slices/productSlice";
import { fetchProductCategories } from "../api/productApi";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchProducts());

    // Fetch categories using API function
    fetchProductCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories", err));
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Our Products</h1>

      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
