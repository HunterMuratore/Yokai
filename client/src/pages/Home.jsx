import { NavLink } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client"

import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

import Carousel from "react-bootstrap/Carousel"
import clothes from "../assets/images/clothesUPD.png"
import furinture from "../assets/images/furnitureUPD.png"
import gaming from "../assets/images/gamingUPD.png"

const GET_ALL_USERS_WISHLISTS = gql`
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

      <div className="d-flex flex-wrap justify-content-center mt-4 gap-4 my-3">
        {data.getAllUsersWishlists.map((user) => (
          <div key={user._id}>
            {user.wishlists && user.wishlists.length > 0 && (
              <Card style={{ width: "18rem" }} className="user-card mb-3">
                <Card.Body>
                  <NavLink to={`/user/${user._id}`}>
                    <Card.Title className="font-weight-bold">{user.username}'s Wishlists</Card.Title>
                  </NavLink>
                </Card.Body>
                <div className="h-100">
                  {user.wishlists.slice(0, 2).map((wishlist) => (
                    <Card key={wishlist._id} style={{ width: "15rem" }} className="wishlist-card mb-3 mx-auto p-2">
                      <div className="d-flex align-items-top">
                        <Card.Title className="fs-6">{wishlist.name}</Card.Title>
                        <NavLink className="ms-auto" to={`/user/${user._id}`}>
                          <Card.Text style={{ fontSize: '12px' }}>View Wishlist</Card.Text>
                        </NavLink>
                      </div>
                      {wishlist.products && wishlist.products.length > 0 ? (
                        <Card.Img className="mt-1" variant="top" src={wishlist.products[0].image} />
                      ) : (
                        <p className="my-auto mx-auto mt-2">This wishlist has no items yet</p>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
