import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingApp from "./ShoppingApp";

describe("ShoppingApp", () => {
  // ── Rendering ──────────────────────────────────────────────────────────────
  describe("Initial render", () => {
    it("renders the FreshMart header", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("🛒 FreshMart")).toBeInTheDocument();
    });

    it("renders all 12 products by default", () => {
      render(<ShoppingApp />);
      const addButtons = screen.getAllByText("+ Add to Cart");
      expect(addButtons).toHaveLength(12);
    });

    it("renders all category filter buttons", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("All Items")).toBeInTheDocument();
      expect(screen.getByText("🧀 Dairy")).toBeInTheDocument();
      expect(screen.getByText("🍎 Fruits")).toBeInTheDocument();
      expect(screen.getByText("🍞 Bakery")).toBeInTheDocument();
      expect(screen.getByText("🥩 Meat")).toBeInTheDocument();
    });

    it("shows an empty cart on load", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("shows cart count as 0 on load", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("renders the Dark Mode toggle button", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    });
  });

  // ── Category filtering ─────────────────────────────────────────────────────
  describe("Category filtering", () => {
    it("shows only Dairy products when Dairy filter is selected", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("🧀 Dairy"));
      expect(screen.getByText("Milk")).toBeInTheDocument();
      expect(screen.getByText("Cheese")).toBeInTheDocument();
      expect(screen.getByText("Yogurt")).toBeInTheDocument();
      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    });

    it("shows only Fruits products when Fruits filter is selected", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("🍎 Fruits"));
      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Mango")).toBeInTheDocument();
      expect(screen.queryByText("Milk")).not.toBeInTheDocument();
    });

    it("shows only Bakery products when Bakery filter is selected", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("🍞 Bakery"));
      expect(screen.getByText("Bread")).toBeInTheDocument();
      expect(screen.getByText("Croissant")).toBeInTheDocument();
      expect(screen.getByText("Bagel")).toBeInTheDocument();
      expect(screen.queryByText("Chicken")).not.toBeInTheDocument();
    });

    it("shows only Meat products when Meat filter is selected", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("🥩 Meat"));
      expect(screen.getByText("Chicken")).toBeInTheDocument();
      expect(screen.getByText("Beef")).toBeInTheDocument();
      expect(screen.getByText("Salmon")).toBeInTheDocument();
      expect(screen.queryByText("Bread")).not.toBeInTheDocument();
    });

    it("shows all products again when All Items is clicked after filtering", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("🧀 Dairy"));
      fireEvent.click(screen.getByText("All Items"));
      const addButtons = screen.getAllByText("+ Add to Cart");
      expect(addButtons).toHaveLength(12);
    });

    it("shows the correct number of products per category", () => {
      render(<ShoppingApp />);
      const categories = [
        { label: "🧀 Dairy", count: 3 },
        { label: "🍎 Fruits", count: 3 },
        { label: "🍞 Bakery", count: 3 },
        { label: "🥩 Meat", count: 3 },
      ];
      categories.forEach(({ label, count }) => {
        fireEvent.click(screen.getByText(label));
        expect(screen.getAllByText("+ Add to Cart")).toHaveLength(count);
      });
    });
  });

  // ── Cart interactions ──────────────────────────────────────────────────────
  describe("Cart interactions", () => {
    it("adds a product to the cart when Add to Cart is clicked", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      expect(screen.getByText(/Milk is in your cart\./i)).toBeInTheDocument();
    });

    it("increments the cart count when a product is added", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("changes the button label to ✓ Added after adding a product", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      expect(screen.getByText("✓ Added")).toBeInTheDocument();
    });

    it("does not add duplicate products to the cart", () => {
      render(<ShoppingApp />);
      const buttons = screen.getAllByText("+ Add to Cart");
      fireEvent.click(buttons[0]);
      // The button is now "✓ Added" — clicking the ✓ Added button should not re-add
      const addedBtn = screen.getByText("✓ Added");
      fireEvent.click(addedBtn);
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("removes a product from the cart when ✕ is clicked", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      fireEvent.click(screen.getByTitle("Remove"));
      expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("decrements the cart count when a product is removed", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      expect(screen.getByText("1")).toBeInTheDocument();
      fireEvent.click(screen.getByTitle("Remove"));
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("can add multiple products to the cart", () => {
      render(<ShoppingApp />);
      const buttons = screen.getAllByText("+ Add to Cart");
      fireEvent.click(buttons[0]); // Milk
      fireEvent.click(buttons[1]); // Cheese
      fireEvent.click(buttons[2]); // Yogurt
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText(/Milk is in your cart\./i)).toBeInTheDocument();
      expect(screen.getByText(/Cheese is in your cart\./i)).toBeInTheDocument();
      expect(screen.getByText(/Yogurt is in your cart\./i)).toBeInTheDocument();
    });

    it("restores the Add to Cart button after removing a product", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getAllByText("+ Add to Cart")[0]);
      fireEvent.click(screen.getByTitle("Remove"));
      expect(screen.getAllByText("+ Add to Cart")).toHaveLength(12);
    });
  });

  // ── Dark mode ──────────────────────────────────────────────────────────────
  describe("Dark mode toggle", () => {
    it("shows 'Dark Mode' button in light mode", () => {
      render(<ShoppingApp />);
      expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    });

    it("switches button label to 'Light Mode' when dark mode is enabled", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("Dark Mode"));
      expect(screen.getByText("Light Mode")).toBeInTheDocument();
    });

    it("toggles back to 'Dark Mode' when clicked again", () => {
      render(<ShoppingApp />);
      fireEvent.click(screen.getByText("Dark Mode"));
      fireEvent.click(screen.getByText("Light Mode"));
      expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    });
  });
});