// EditProduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProduct({ productId }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${productId}`
        );
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/products/${productId}`,
        {
          name,
          price,
          description,
          category,
        }
      );
      // Optionally, you can redirect the user to the product list after updating
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="clothes">Clothes</option>
        <option value="accessories">Accessories</option>
        <option value="makeup">Makeup</option>
        <option value="kitchenitems">Kitchen Items</option>
        <option value="homeessential">Home Essentials</option>
        <option value="electronics">Electronics</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
