import React, { useState, memo } from "react";
import { Product } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { CheckCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowMessage(true);

    // Hide message after 2 seconds
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        Add to Cart
      </button>

      {showMessage && (
        <div className="mt-2 flex items-center text-green-600 text-sm font-semibold">
          <CheckCircle className="w-4 h-4 mr-1" />
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export { ProductCard };
export default memo(ProductCard);
