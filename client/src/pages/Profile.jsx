import { useState, useEffect } from "react";
import { useStore } from "../store";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Wishlist from "../components/Wishlist";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

function Profile() {
  const { user, setState } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (nextOpenState, event, metadata) => {
    setIsOpen(nextOpenState);
  };

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

  if (!user) {
    navigate('/login')
  }

  return (
    <>
      <section>
        <div>
          <h1 className="font-weight-bold my-5 text-center">{user.username}'s Wishlists</h1>
        </div>
        <div>
          <Wishlist userId={userId} />
        </div>
        <Dropdown>
          <Dropdown.Toggle className="my-btn my-3" id="dropdown-basic">
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

        <div className="row mt-2">
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
    </>
  );
}

export default Profile;
