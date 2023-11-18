import React, { useState, useEffect } from "react";
import { useStore } from "../store";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Wishlist from "../components/Wishlist";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

function Profile() {
  const { user } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [showWishlists, setShowWishlists] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

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
  const toggleWishlist = () => {
    setShowWishlists(!showWishlists);
  };

  return (
    <section>
      <div>
        <div>
          <button className="my-btn" onClick={toggleWishlist}>
            My Wishlists
          </button>
          {showWishlists && (
            <div>
              <Wishlist userId={userId} />
            </div>
          )}
        </div>
      </div>
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
