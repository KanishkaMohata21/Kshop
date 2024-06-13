import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/UserContext";
import { CartProvider } from "./components/Cart/cartContext"; // Correct import
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* Ensure CartProvider is wrapped correctly */}
        <Router>
          <App />
        </Router>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

