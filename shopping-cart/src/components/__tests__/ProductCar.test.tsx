import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../ProductCard"; // ✅ Ensure named import
import { Provider } from "react-redux";
import { store } from "../../store/store";
import type { Product } from "../../types"; // ✅ Ensure Product type is imported

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "A sample product.",
  image: "https://via.placeholder.com/150",
  category: "electronics",
};

test("renders ProductCard and allows adding to cart", () => {
  render(
    <Provider store={store}>
      <ProductCard product={mockProduct} />{" "}
      {/* ✅ TypeScript now recognizes the prop */}
    </Provider>,
  );

  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Add to Cart/i));
  expect(screen.getByText(/Item added to cart!/i)).toBeInTheDocument();
});
