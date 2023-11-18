import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const GET_WISHLISTS = gql`
  query GetWishlists {
    getWishlists {
      _id
      name
    }
  }
`;
const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!) {
    createWishlist(name: $name) {
      _id
      name
    }
  }
`;

const DELETE_WISHLIST = gql`
  mutation DeleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
      _id
    }
  }
`;

const UPDATE_WISHLIST = gql `
mutation UpdateWishlist($id: ID!, $name: String!) {
   updateWishlist(id: $id, name: $name) {
    _id
    name
   }
}
`

function Wishlist({ handleClose, userId }) {
  const [wishlistName, setWishlistName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState({ id: "", edit: false });
  const [wishlists, setWishlists] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_WISHLISTS);
  const [CreateWishlistMutation] = useMutation(CREATE_WISHLIST);
  const [UpdateWishlistMutation] = useMutation(UPDATE_WISHLIST);
  const [DeleteWishlistMutation] = useMutation(DELETE_WISHLIST, {
    update(cache, { data: { deleteWishlist } }) {
      const existingWishlists = cache.readQuery({
        query: GET_WISHLISTS,
      });

      const updatedWishlists = existingWishlists.getWishlists.filter(
        (wishlist) => wishlist._id !== deleteWishlist._id
      );

      cache.writeQuery({
        query: GET_WISHLISTS,
        data: {
          getWishlists: updatedWishlists,
        },
      });
    },
  });

  const handleDeleteWhishlist = async (wishlistId) => {
    try {
      const result = await DeleteWishlistMutation({
        variables: { id: wishlistId },
      });
      console.log(result);

      alert("Wishlist Deleted! Congrats?");
      refetch();
    } catch (error) {
      console.error("Failed to delete wishlit, this is for the best");
    }
  };

  useEffect(() => {
    console.log("called", data);
    if (!loading && data && data.getWishlists) {
      setWishlists(data.getWishlists);
    }
  }, [loading, data]);

  const handleUpdateWishlist = (wishlistId, wishlistName) => {
    setEditMode({ id: wishlistId, edit: true });
    setWishlistName(wishlistName);
    console.log("wishlist updated");
  };

  const handleInputChange = (e) => {
    setWishlistName(e.target.value);
  };

  const handleEditSubmit = async (wishlistId) => {
    try {
      const result = await UpdateWishlistMutation({
        variables: { id: wishlistId, name: wishlistName },
        context: {
          headers: {
            authorization: userId,
          },
        },
      });

      console.log(result);
      alert("wishlist Updated");
      setEditMode({ id: '', edit: false})
      refetch();
    } catch (error) {
      console.error("Failed to update wihslist");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await CreateWishlistMutation({
        variables: { name: wishlistName },
        context: {
          headers: {
            authorization: userId,
          },
        },
      });

      console.log(result);
      alert(`Wishlist ${result.data.createWishlist.name} created!`);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error("Failed to load wishlists");
    }
  };

  const handleCreateToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between mb-3">
            <h3>Wishlist Items</h3>
            <button
              className="my-btn"
              onClick={handleCreateToggle}
            >
              Create Wishlist
            </button>
          </div>

          <div className="list-group">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {editMode.edit && editMode.id === wishlist._id ? (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      value={wishlistName}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleEditSubmit(wishlist._id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>{wishlist.name}</p>
                    <div>
                      <button
                        className="btn btn-warning mr-2"
                        onClick={() =>
                          handleUpdateWishlist(wishlist._id, wishlist.name)
                        }
                      >
                       <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteWhishlist(wishlist._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="row mt-4">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="wishlistName">Wishlist Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="wishlistName"
                  value={wishlistName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Wishlist
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={handleCreateToggle}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;