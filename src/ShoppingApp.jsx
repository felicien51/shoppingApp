import { useState } from "react";

const products = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Cheese", category: "Dairy" },
  { id: 3, name: "Yogurt", category: "Dairy" },
  { id: 4, name: "Apple", category: "Fruits" },
  { id: 5, name: "Banana", category: "Fruits" },
  { id: 6, name: "Mango", category: "Fruits" },
  { id: 7, name: "Bread", category: "Bakery" },
  { id: 8, name: "Croissant", category: "Bakery" },
  { id: 9, name: "Bagel", category: "Bakery" },
  { id: 10, name: "Chicken", category: "Meat" },
  { id: 11, name: "Beef", category: "Meat" },
  { id: 12, name: "Salmon", category: "Meat" },
];

const categories = ["All", "Dairy", "Fruits", "Bakery", "Meat"];

export default function ShoppingApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart((prev) => [...prev, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const theme = {
    bg: darkMode ? "#0f0f13" : "#f5f0e8",
    surface: darkMode ? "#1a1a24" : "#ffffff",
    card: darkMode ? "#22222f" : "#fdfaf4",
    border: darkMode ? "#2e2e40" : "#e2d9c8",
    text: darkMode ? "#e8e4f0" : "#1a1208",
    muted: darkMode ? "#7a7a99" : "#8a7a5a",
    accent: darkMode ? "#c8a96e" : "#b8813a",
    accentSoft: darkMode ? "#2a2218" : "#fef3e2",
    btnBg: darkMode ? "#c8a96e" : "#b8813a",
    btnText: darkMode ? "#0f0f13" : "#ffffff",
    tagActive: darkMode ? "#c8a96e" : "#b8813a",
    tagActiveTxt: darkMode ? "#0f0f13" : "#fff",
    tagInactive: darkMode ? "#22222f" : "#f0e8d4",
    tagInactiveTxt: darkMode ? "#7a7a99" : "#8a7a5a",
    shadow: darkMode
      ? "0 4px 24px rgba(0,0,0,0.5)"
      : "0 4px 24px rgba(0,0,0,0.08)",
  };

  const styles = {
    app: {
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      transition: "background 0.3s, color 0.3s",
    },
    header: {
      background: theme.surface,
      borderBottom: `1px solid ${theme.border}`,
      padding: "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: theme.shadow,
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontSize: "1.6rem",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      color: theme.accent,
    },
    logoSub: {
      fontSize: "0.75rem",
      color: theme.muted,
      letterSpacing: "3px",
      textTransform: "uppercase",
      marginTop: "2px",
    },
    toggleBtn: {
      padding: "9px 22px",
      borderRadius: "50px",
      border: `2px solid ${theme.accent}`,
      background: "transparent",
      color: theme.accent,
      fontFamily: "inherit",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      letterSpacing: "0.5px",
      transition: "all 0.2s",
    },
    main: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 24px",
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "32px",
    },
    sectionTitle: {
      fontSize: "0.7rem",
      fontWeight: "700",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: theme.muted,
      marginBottom: "16px",
    },
    filterRow: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    filterBtn: (active) => ({
      padding: "7px 18px",
      borderRadius: "50px",
      border: "none",
      background: active ? theme.tagActive : theme.tagInactive,
      color: active ? theme.tagActiveTxt : theme.tagInactiveTxt,
      fontFamily: "inherit",
      fontSize: "0.82rem",
      fontWeight: active ? "700" : "500",
      cursor: "pointer",
      transition: "all 0.2s",
      letterSpacing: "0.3px",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: "16px",
    },
    productCard: (inCart) => ({
      background: theme.card,
      border: `1.5px solid ${inCart ? theme.accent : theme.border}`,
      borderRadius: "14px",
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      boxShadow: inCart ? `0 0 0 3px ${theme.accentSoft}` : theme.shadow,
      transition: "all 0.2s",
    }),
    productEmoji: {
      fontSize: "2rem",
      textAlign: "center",
    },
    productName: {
      fontSize: "1rem",
      fontWeight: "600",
      textAlign: "center",
      color: theme.text,
    },
    productCategory: {
      fontSize: "0.72rem",
      color: theme.muted,
      textAlign: "center",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
    addBtn: (inCart) => ({
      padding: "8px",
      borderRadius: "8px",
      border: "none",
      background: inCart ? theme.accentSoft : theme.btnBg,
      color: inCart ? theme.accent : theme.btnText,
      fontFamily: "inherit",
      fontSize: "0.8rem",
      fontWeight: "700",
      cursor: inCart ? "default" : "pointer",
      transition: "all 0.2s",
      letterSpacing: "0.5px",
    }),
    cartPanel: {
      background: theme.surface,
      border: `1px solid ${theme.border}`,
      borderRadius: "18px",
      padding: "24px",
      boxShadow: theme.shadow,
      alignSelf: "start",
      position: "sticky",
      top: "90px",
    },
    cartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    cartCount: {
      background: theme.accent,
      color: theme.btnText,
      borderRadius: "50px",
      padding: "2px 10px",
      fontSize: "0.78rem",
      fontWeight: "700",
    },
    cartEmpty: {
      color: theme.muted,
      fontSize: "0.88rem",
      textAlign: "center",
      padding: "24px 0",
      fontStyle: "italic",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: `1px solid ${theme.border}`,
      fontSize: "0.9rem",
    },
    cartItemText: {
      color: theme.text,
      fontWeight: "500",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: theme.muted,
      cursor: "pointer",
      fontSize: "1rem",
      lineHeight: 1,
      padding: "2px 6px",
      borderRadius: "4px",
    },
  };

  const categoryEmoji = {
    Dairy: "🧀",
    Fruits: "🍎",
    Bakery: "🍞",
    Meat: "🥩",
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>🛒 FreshMart</div>
          <div style={styles.logoSub}>Grocery Delivered</div>
        </div>
        <button style={styles.toggleBtn} onClick={toggleDarkMode}>
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      <main style={styles.main}>
        <section>
          <div style={styles.sectionTitle}>Browse Products</div>

          <div style={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                style={styles.filterBtn(selectedCategory === cat)}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? "All Items" : `${categoryEmoji[cat]} ${cat}`}
              </button>
            ))}
          </div>

          <div style={styles.grid}>
            {filteredProducts.map((product) => {
              const inCart = !!cart.find((item) => item.id === product.id);
              return (
                <div key={product.id} style={styles.productCard(inCart)}>
                  <div style={styles.productEmoji}>
                    {categoryEmoji[product.category]}
                  </div>
                  <div>
                    <div style={styles.productName}>{product.name}</div>
                    <div style={styles.productCategory}>{product.category}</div>
                  </div>
                  <button
                    style={styles.addBtn(inCart)}
                    onClick={() => !inCart && addToCart(product)}
                  >
                    {inCart ? "✓ Added" : "+ Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <aside style={styles.cartPanel}>
          <div style={styles.cartHeader}>
            <div style={{ ...styles.sectionTitle, marginBottom: 0 }}>Your Cart</div>
            <span style={styles.cartCount}>{cart.length}</span>
          </div>

          {cart.length === 0 ? (
            <div style={styles.cartEmpty}>Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <span style={styles.cartItemText}>
                  {item.name} is in your cart.
                </span>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </aside>
      </main>
    </div>
  );
}
