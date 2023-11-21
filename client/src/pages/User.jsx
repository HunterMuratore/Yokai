import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { useQuery, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import Card from "react-bootstrap/Card";
import Wishlist from "../components/Wishlist";

const GET_USER_BY_ID = gql`
  query GetUser($userId: ID!) {
    getUserById(userId: $userId) {
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
`;

function User() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });
  const [visibleProducts, setVisibleProducts] = useState({})

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  const handleToggleProducts = (wishlistId) => {
    setVisibleProducts((prevVisibleProducts) => ({
      ...prevVisibleProducts,
      [wishlistId]: !prevVisibleProducts[wishlistId],
    }))
    // refetch()
  }

  const handleCreateToggle = () => {
    setShowForm(!showForm)
  }

  return (
    <section className="user-page">
      <h1 className="font-weight-bold mt-5 mb-4 text-center">
        {user.username}'s Wishlists
      </h1>

      <div>
        {user.wishlists.map((wishlist) => {
          const isProductsVisible = visibleProducts[wishlist._id]
          return (
            <Card key={wishlist._id} userid={userId} className="d-flex flex-col mb-3 mx-auto user-card">
              <Card.Body className="user-body">
                <div className="d-flex align-items-center">
                  <Card.Title className="product-name mt-2">{wishlist.name}</Card.Title>
                  <FontAwesomeIcon
                    className="wishlist-dropdown ms-2"
                    onClick={() => handleToggleProducts(wishlist._id)}
                    icon={faCaretDown} />
                </div>
                {isProductsVisible && wishlist.products && wishlist.products.length > 0 ? (
                  <>
                    {wishlist.products.map((product, i) => (
                      <Card key={i} style={{ width: "15rem" }} className="wishlist-card d-flex justify-content-around mb-3 mx-auto p-2">
                        <div key={product.productId} className="product flex-wrap">
                          <img className="product-image" src={product.image} alt={product.name} />
                          <Card.Title className="product-name mt-2">{product.name}</Card.Title>
                          <Card.Text>Price: ${product.price}</Card.Text>
                          <button className="my-btn product-btn">Buy Now</button>
                        </div>
                      </Card>
                    ))}
                  </>
                ) : null
                }
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default User;

// <div>
// <Wishlist userId={user._id} />
// </div>

{/* <div>
{user.wishlists.map((wishlist) => {
  const isProductsVisible = visibleProducts[wishlist._id];
  return (
    <Card key={wishlist._id} userid={userId} className="d-flex flex-col mb-3 mx-auto user-card">
      <Card.Body className="user-body">
        <div className="d-flex align-items-center">
          <Card.Title className="product-name mt-2">{wishlist.name}</Card.Title>
          <FontAwesomeIcon
            className="wishlist-dropdown ms-2"
            onClick={() => handleToggleProducts(wishlist._id)}
            icon={faCaretDown}
          />
        </div>
        {isProductsVisible && wishlist.products && wishlist.products.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {wishlist.products.map((product, i) => (
              <div key={i} className="col">
                <Card style={{ width: "15rem" }} className="wishlist-card d-flex justify-content-around mb-3 mx-auto p-2">
                  <div key={product.productId} className="product flex-wrap">
                    <img className="product-image" src={product.image} alt={product.name} />
                    <Card.Title className="product-name mt-2">{product.name}</Card.Title>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <button className="my-btn product-btn">Buy Now</button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
})}
</div> */}