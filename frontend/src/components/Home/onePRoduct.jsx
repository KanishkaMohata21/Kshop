import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Cart/cartContext";
import { useAuth } from '../UserContext';
import { useNavigate } from "react-router-dom";

export default function OneProduct({ history }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/products/getproducts/${productId}`
      );
      setProduct(response.data.product);
      setLoading(false);
      console.log("Product:", response.data.product);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!auth.user) {
      navigate('/login')
    } else {
      addToCart(product);
    }
  };

  return (
    <div>
      <div className="ProductContainer">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="Oneproduct">
            <div>
              {product.image &&
              product.image.contentType &&
              product.image.data ? (
                <img
                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                  alt={product.name}
                  height={340}
                  width={350}
                />
              ) : (
                <div>No image available</div>
              )}
            </div>
            <div className="details">
              <h1>{product.name}</h1>
              <h3 style={{color:'blue'}}>{product.description}</h3>
              <h3>{product.price}Rs</h3>
              <div className="ui buttons">
                <button className="ui button" onClick={handleAddToCart}>Add to Cart</button>
                <div className="or"></div>
                <button className="ui positive button">Buy Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
