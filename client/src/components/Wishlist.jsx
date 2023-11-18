import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_WISHLIST = gql`
  mutation CreateWishlist($name: String!) {
    createWishlist(name: $name) {
      _id
      name
    }
  }
`;
function Wishlist({ handleClose }) {
  const [wishlistName, setWishlistName] = useState("");

  const handleInputChange = (e) => {
    setWishlistName(e.target.value);
  };
  const [CreateWishlistMutation] = useMutation(CREATE_WISHLIST);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await CreateWishlistMutation({
            variables: {name: wishlistName}
        })

        console.log(result)

        alert(`Wishlist ${result.data.createWishlist.name} created!`);
        handleClose();
    } catch (error) {
        console.error('Failed to add wishlist')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="wishlistName">Wishlist Name:</label>
      <input
        type="text"
        id="wishlistName"
        value={wishlistName}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Create Wishlist</button>
    </form>
  );
}

export default Wishlist;
