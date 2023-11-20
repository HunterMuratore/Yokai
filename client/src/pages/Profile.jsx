import { useState, useEffect } from "react"
import { useStore } from "../store"
import { useNavigate } from "react-router-dom"
import { gql, useQuery, useMutation } from "@apollo/client"

import Dropdown from "react-bootstrap/Dropdown"
import Card from "react-bootstrap/Card"
import Wishlist from "../components/Wishlist"
import Modal from "react-bootstrap/Modal"

const GET_WISHLISTS = gql`
  query getWishlists {
    getWishlists {
      _id
      name
    }
  }
`

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $productId: Int!,
    $wishlistId: ID!,
    $name: String!,
    $image: String!,
    $price: Int!,
  ) {
    createProduct(
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
  const { loading, error, data, refetch } = useQuery(GET_WISHLISTS)
  const [createProduct] = useMutation(CREATE_PRODUCT)
  const navigate = useNavigate()

  const handleToggle = (nextOpenState, event, metadata) => {
    setIsOpen(nextOpenState)
  }

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
      console.log(category.id)
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
    console.log(category.id)
  }

  function toLogin() {
    navigate('/login')
  }
  const handleAddToWishlist = async (wishlistId, product) => {
    try {
      console.log("clicked")
      console.log(wishlistId)
      const { id: productId, title: name, price } = product
      console.log(product)

      console.log("Before createProduct mutation")

      const { data: createdProductData } = await createProduct({
        variables: {
          productId: productId,
          wishlistId,
          name: name,
          image: product.images[0],
          price,
        },
      })

      console.log("After createProduct mutation")

      if (createdProductData) {
        console.log("Product added:", createdProductData.createProduct)
        setIsOpen(false)
      } else {
        console.log("No product added!")
      }

      setIsOpen(false)
      console.log("added?")
    } catch (err) {
      console.error("Error adding product:", err)
    }
  }

  return (
    <>
      {!user ? toLogin() : (
        <section>
          <h1 className="font-weight-bold mt-5 mb-4 text-center">{user.username}'s Wishlists</h1>

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
                <Card.Text>Price: {product.price}</Card.Text>
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