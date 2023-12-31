import { NavLink } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import Card from "react-bootstrap/Card"

import Carousel from "react-bootstrap/Carousel"
import clothes from "../assets/images/clothesUPD.png"
import furinture from "../assets/images/furnitureUPD.png"
import gaming from "../assets/images/gamingUPD.png"

export const GET_ALL_USERS_WISHLISTS = gql`
  query getAllUsersWishlists {
    getAllUsersWishlists {
      _id
      username
      wishlists {
        _id
        name
        products {
            productId
            name
            price
            image
        }
      }
    }
  }
`

function Home() {
  const images = [clothes, furinture, gaming]
  const { loading, error, data } = useQuery(GET_ALL_USERS_WISHLISTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const outputWishlist = (user, wishlist) => {
    return (
      <Card className="wishlist-card mx-auto p-2">
        <div className="d-flex">
          <Card.Title className="fs-5">{wishlist.name}</Card.Title>
          <NavLink className="ms-auto ms-2" to={`/user/${user._id}`}>
            <Card.Text style={{ fontSize: '12px' }}>View</Card.Text>
          </NavLink>
        </div>
        {wishlist.products && wishlist.products.length > 0 ? (
          <Card.Img className="user-wishlist-image px-4" variant="top" src={wishlist.products[0].image} />
        ) : (
          <p className="my-auto mx-auto mt-2">This wishlist has no items yet</p>
        )}
      </Card>
    )
  }

  return (
    <div className='home'>
      <div className="carousel-container mt-4">
        <Carousel fade>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img className="w-100" src={image} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="d-flex flex-wrap justify-content-center mt-4 gap-4">
        {data.getAllUsersWishlists.map((user) => (
          user.wishlists && user.wishlists.length > 0 && (
            <div key={user._id}>
              <Card style={{ width: "18rem" }} className="user-card mb-1">
                <div className="d-flex align-items-center justify-content-between">
                  <Card.Title className="font-weight-bold p-2">{user.username}'s Wishlists</Card.Title>
                  <NavLink to={`/user/${user._id}`}>
                    <FontAwesomeIcon
                      className="user-link me-3"
                      icon={faArrowUpRightFromSquare} />
                  </NavLink>
                </div>
                <div className="mb-auto px-4">
                  {outputWishlist(user, user.wishlists[0])}
                </div>
              </Card>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default Home
