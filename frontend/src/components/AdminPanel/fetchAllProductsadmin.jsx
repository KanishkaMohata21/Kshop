import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, Image } from "semantic-ui-react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

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

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/deleteproduct/${productId}`);
      fetchProductList();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
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
          {productList.map((product, index) => (
            <Link to={`/products/${product._id}`} key={product._id} className="product">
              <Card>
                {product.image && (
                  <Image
                    src={`data:${product.image.contentType};base64,${product.image.data}`}
                    alt={product.name}
                    ui={false}
                    size="medium"
                    className="product-image"
                  />
                )}
                <CardContent className="space">
                  <div>
                    <CardHeader>
                      <h3 style={{ marginRight: "100px" }}>{product.name}</h3>
                    </CardHeader>
                  </div>
                  <div className="updates">
                    <MdEdit onClick={() => handleEdit(product)} />
                    <MdDelete onClick={() => handleDelete(product._id)} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
