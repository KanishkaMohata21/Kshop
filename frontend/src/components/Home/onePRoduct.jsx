import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiColorFill } from "react-icons/bi";

export default function OneProduct() {
  const { id } = useParams(); // Extract product ID from URL
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct(id);
  }, [id]); // Trigger fetchProduct when ID changes

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

  return (
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
            <div class="ui buttons">
              <button class="ui button">Add to Cart</button>
              <div class="or"></div>
              <button class="ui positive button">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
