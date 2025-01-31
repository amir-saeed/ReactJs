import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const mockProduct = {
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
      <ProductCard product={mockProduct} />
    </Provider>
  );

  // Check if the product title appears
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

  // Click "Add to Cart" button
  const button = screen.getByText(/Add to Cart/i);
  fireEvent.click(button);

  // Verify success message
  expect(screen.getByText(/Item added to cart!/i)).toBeInTheDocument();
});
