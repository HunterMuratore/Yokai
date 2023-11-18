import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Wishlist from "../components/Wishlist";

function Profile() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showForm, setShowFrom] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      if (!response.ok) throw new Error("Failed to fetch categories");

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductsByCategory = async (category) => {
    try {
      console.log(category.id);
      const response = await fetch(`
      https://api.escuelajs.co/api/v1/categories/${category.id}/products
      `);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(category.id);
  };

  const handleAddWishList = () => {
    setShowFrom(true);
  };

  const handleCloseForm = () => {
    setShowFrom(false);
  };
  return (
    <section>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Browse Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item
              key={category.id}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="wishlist">
        <button className="my-btn" onClick={handleAddWishList}>
          Add a Wishlist
        </button>
      </div>
      {showForm && (
        <div className="wishlist-container">
          <Wishlist handleClose={handleCloseForm} />
        </div>
      )}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <Card>
              <Card.Img
                variant="top"
                src={product.images[0]}
                alt={product.title}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: {product.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
     
      
    </section>
  );
}

export default Profile;
