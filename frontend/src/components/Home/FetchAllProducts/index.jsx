// FetchAllProducts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  Image,
  Dropdown,
} from "semantic-ui-react";

export default function FetchAllProducts({ searchQuery }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(""); // State for selected category

  async function fetchProductList() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/products/getProducts"
      );
      setProductList(response.data.products);
      setLoading(false);
      console.log("Product List:", response.data.products);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductList();
  }, []);

  // Function to handle category change
  const handleCategoryChange = (e, { value }) => {
    setCategory(value);
  };

  // Filter products based on selected category and search query
  const filteredProducts = productList.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearchQuery = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearchQuery;
  });

  // Options for category dropdown
  const categoryOptions = [
    { key: "all", text: "All", value: "" },
    { key: "clothes", text: "Clothes", value: "clothes" },
    { key: "accessories", text: "Accessories", value: "accessories" },
    { key: "makeup", text: "Makeup", value: "makeup" },
    { key: "kitchenitems", text: "Kitchen Items", value: "kitchenitems" },
    { key: "homeessential", text: "Home Essentials", value: "homeessential" },
    { key: "electronics", text: "Electronics", value: "electronics" },
  ];

  return (
    <div className="">
      <div className="filter-container">
        <Dropdown
          placeholder="Select Category"
          selection
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={category}
          className="dropdown-right"
        />
      </div>
      {loading ? (
        <div className="ui active centered inline loader"></div>
      ) : (
        <div className="product-container">
          {filteredProducts && filteredProducts.length ? (
            filteredProducts.map((product, index) => (
              <Link
                to={`/products/${product._id}`}
                key={index}
                className="product"
              >
                <div className="product">
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
                      </CardContent>
                    </Card>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
