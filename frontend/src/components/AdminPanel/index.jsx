import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import FetchAllProducts from "./fetchAllProductsadmin";
import admin from "../../assets/Designer (1).png";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editProductId) {
      window.scrollTo(0, 0);
    }
  }, [editProductId]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage(null);
    setEditProductId(null);
    setIsEdit(false);
  };

  const handleAdd = async () => {
    const formData = new FormData();

    try {
      let response;
      if (editProductId) {
        response = await axios.post(
          `http://localhost:8000/api/products/updateproduct/${editProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsEdit(false);
      } else {
        response = await axios.post(
          "http://localhost:8000/api/products/createproduct",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      console.log("Product created/updated:", response.data);
    } catch (error) {
      console.error("Error creating/updating product:", error);
    } finally {
      resetForm();
    }
  };

  return (
    <div className="adminpanel">
      <div className="addproduct">
        <img
          src={admin}
          alt="Admin"
          className="admin-image"
          height={300}
          width={320}
        />
        <div>
          <h2 style={{ margin: "12px", textAlign: "center" }}>
            {isEdit ? "Edit Product" : "Create Product"}
          </h2>
          <form className="productform">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="clothes">Clothes</option>
              <option value="accessories">Accessories</option>
              <option value="makeup">Makeup</option>
              <option value="kitchenitems">Kitchen Items</option>
              <option value="homeessential">Home Essentials</option>
              <option value="electronics">Electronics</option>
            </select>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              required={!isEdit}
            />
            <button type="button" className="add-btn" onClick={handleAdd}>
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <div className="viewproducts">
        <FetchAllProducts onEdit={(product) => {
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setCategory(product.category);
          setEditProductId(product._id);
          setIsEdit(true);
          window.scrollTo(0, 0);
        }} />
      </div>
    </div>
  );
}
