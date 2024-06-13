import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, Image } from "semantic-ui-react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css"; // Import CSS styles

export default function FetchAllProducts({ onEdit }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchProductList() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/products/getProducts");
      setProductList(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleDelete = async (productId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8000/api/products/deleteproduct/${productId}`);
      fetchProductList();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product, e) => {
    e.stopPropagation();
    onEdit(product);
    navigate("/adminpanel", { state: { product } });
  };

  return (
    <div>
      {loading ? (
        <div>Loading... Please Wait</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-container">
          {productList.map((product) => (
            <div className="product" key={product._id}>
              <Card>
                <CardContent className="product-card-content">
                  <Link to={`/products/${product._id}`} className="product-image-link">
                    {product.image && (
                      <Image
                        src={`data:${product.image.contentType};base64,${product.image.data}`}
                        alt={product.name}
                        style={{height:'320px'}}
                        ui={false}
                        size="medium"
                        className="product-image"
                      />
                    )}
                  </Link>
                  <div className="product-card-header">
                    <CardHeader>
                      <h3>{product.name}</h3>
                    </CardHeader>
                    <div className="updates">
                      <MdEdit onClick={(e) => handleEdit(product, e)} />
                      <MdDelete onClick={(e) => handleDelete(product._id, e)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
