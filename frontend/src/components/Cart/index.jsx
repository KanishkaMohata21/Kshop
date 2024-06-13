import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext";
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import {
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  Image,
  Button,
  Segment,
  Header,
} from "semantic-ui-react";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      // Set the cart context with the stored cart items
      // This will ensure that the cart remains in sync with the local storage
      // No need to setCart, as cart state is managed by the context
    }
  }, []);

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    // Remove the item from the cart context
    console.log(productId)
    removeFromCart(productId);
  
    // Remove the item from local storage
    const updatedCart = cart.filter((item) => item._id !== productId);
    console.log("Updated Cart:", updatedCart); // Log the updated cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate the total price of all items in the cart
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const makePayment = async () => {
    try {
      console.log("Starting payment process");

      const stripe = await loadStripe(
        "pk_test_51PQvfTHaK7lgle23660SiQKe7qwutoh25lvy6mMzJLGBY1ZO1k9RLhm0YyIa9H1hZsz0A3MOuBnQPGXmEujptMOn00sUlVOjkv"
      );

      const body = {
        products: cart
      };

      const headers = {
        "Content-Type": "application/json"
      };

      const response = await fetch("http://localhost:8000/api/products/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
  
  return (
    <div
      style={{
        display: "flex",
        minHeight: "520px",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        {cart.length === 0 ? (
          <Segment style={{ width: "100%" }} inverted>
            <Header style={{ width: "100%" }} as="h4" inverted color="red">
              <h2 style={{ textAlign: "center" }}>Your Cart is empty</h2>
            </Header>
          </Segment>
        ) : (
          <div
            className="product-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0", // Remove gap between items
              alignItems: "start",
            }}
          >
            {cart.map((product, index) => (
              <Link
                to={`/products/${product._id}`}
                key={index}
                className="product"
              >
                <div className="product" style={{}}>
                  {product.image && (
                    <Card>
                      <Image
                        src={`data:${product.image.contentType};base64,${product.image.data}`}
                        alt={product.name}
                        ui={false}
                        size="medium"
                        className="product-image"
                      />
                      <CardContent className="center">
                        <CardHeader>{product.name}</CardHeader>
                        <CardMeta>{product.price} Rs</CardMeta>
                        <Button
                          primary
                          onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation
                            handleRemoveFromCart(product._id);
                          }}
                        >
                          Remove from Cart
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Segment style={{ width: "100%", marginTop: "40px" }} inverted>
        <Header style={{ width: "100%" }} as="h4" inverted color="red">
          <h2 style={{ textAlign: "center" }}>
            {cart.length > 0 && (
              <h2>
                Total Price: {totalPrice} Rs
              </h2>
            )}
          </h2>
        </Header>
      </Segment>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button primary size='large' style={{ width: '130px' }} onClick={makePayment}>
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Cart;
