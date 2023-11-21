import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Card from "react-bootstrap/Card";
// import Wishlist from "../components/Wishlist";

const GET_USER_BY_ID = gql`
  query GetUser($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      wishlists {
        _id
        name
      }
    }
  }
`;

function User() {
  const { userId } = useParams();
  console.log("userId: ", userId);
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <section>
      <h1 className="font-weight-bold mt-5 mb-4 text-center">
        {user.username}'s Wishlists
      </h1>
      <div>
        {user.wishlists.map((wishlist) => {
          console.log(wishlist);
          return (
            <Card key={wishlist._id} userId={userId}>
              <Card.Body>
                <Card.Title>{wishlist.name}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default User;
