import { useState, useEffect } from "react"
import { useStore } from "../store"
import { useNavigate } from "react-router-dom"
import { gql, useQuery, useMutation } from "@apollo/client"

import Dropdown from "react-bootstrap/Dropdown"
import Card from "react-bootstrap/Card"
import profilePic from '../assets/images/profile.png'

import ProfileImageUpload from '../components/ProfileImageUpload'
import Wishlist from "../components/Wishlist"

import { GET_WISHLISTS } from '../components/Wishlist'

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $productId: Int!,
    $wishlistId: ID!,
    $name: String!,
    $image: String!,
    $price: Int!,
  ) {
    createProduct (
      productId: $productId,
      wishlistId: $wishlistId,
      image: $image,
      price: $price,
      name: $name
    ) {
      productId
    }
  }
`

function Profile() {
  const { user, setState } = useStore()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [userId, setUserId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileImageUpload, setShowProfileImageUpload] = useState(false);
  const { loading, error, data } = useQuery(GET_WISHLISTS)
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [
      GET_WISHLISTS
    ]
  })
  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      )
      if (!response.ok) throw new Error("Failed to fetch categories")

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`
      https://api.escuelajs.co/api/v1/categories/${category.id}/products
      `)
      if (!response.ok) throw new Error("Failed to fetch products")

      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory)
    }
  }, [selectedCategory])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  function toLogin() {
    navigate('/login')
  }

  const toggleProfileImageUpload = () => {
    setShowProfileImageUpload(!showProfileImageUpload);
  };

  const handleProfileImageUpload = async (selectedImage) => {
    try {
      await uploadProfilePicture({
        variables: {
          id: user.id,
          profilePicture: selectedImage,
        },
      });

      setShowProfileImageUpload(false);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  const handleAddToWishlist = async (wishlistId, product) => {
    try {
      const { id: productId, title: name, price } = product

      const { data: createdProductData } = await createProduct({
        variables: {
          productId,
          wishlistId,
          name,
          image: product.images[0],
          price,
        },
      })

      if (createdProductData) {
        setIsOpen(false)
      } else {
        console.log("No product added!")
      }

      setIsOpen(false)

    } catch (err) {
      console.error("Error adding product:", err)
    }
  }

  return (
    <>
      {!user ? toLogin() : (
        <section className="profile">

          <div className="d-flex mx-auto">
            {showProfileImageUpload && (
              <ProfileImageUpload onUpload={handleProfileImageUpload} />
            )}
          </div>

          <div className="profile-picture d-flex justify-content-center my-5">
            {/* If user has no profile pic in db then set this */}
            <img onClick={toggleProfileImageUpload} src={profilePic} alt="Profile Picture" />
          </div>

          <h1 className="font-weight-bold mt-4 mb-4 text-center">{user.username}'s Wishlists</h1>

          <div>
            <Wishlist userId={userId} />
          </div>

          <h2 className="mt-5">Add Items To Wishlists:</h2>
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
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="my-btn"
                        id={`dropdown-${product.id}`}
                      >
                        Add to Wishlist
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {data &&
                          data.getWishlists.map((wishlist) => (
                            <Dropdown.Item
                              key={wishlist._id}
                              onClick={() => {
                                handleAddToWishlist(wishlist._id, product)
                              }}
                            >
                              {wishlist.name}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Profile