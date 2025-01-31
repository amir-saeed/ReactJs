import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchProducts } from "../store/slices/productSlice";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { fetchProductCategories } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchProducts());

    // Fetch categories using the centralized API function
    fetchProductCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories", err));
  }, [dispatch]);

  const filteredProducts =
    selectedCategory === "all"
      ? items
      : items.filter((product) => product.category === selectedCategory);

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

      {/* Product List */}
      {isLoading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
