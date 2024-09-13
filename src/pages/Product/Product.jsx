import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToWishList, removeFromWishList } from "../../redux/favouriteSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const Product = () => {
  const { id } = useParams();

  const [loading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fvts = useSelector((state) => state.wishlist);

  const sendEmail = async () => {
    try {
      //   "userID": 3,

      const response = await axios.post(
        "https://66c63bc2134eb8f43497236c.mockapi.io/orders",
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          userId: user.id,
        }
      );

      if (response.status === 201) {
        emailjs
          .send(
            "service_k22f092",
            "template_w0egof6",
            {
              name: user.name,
              product_name: product.name,
              product_price: product.price,
              email: user.email,
            },
            {
              publicKey: "2sPQ98XL1mQ07Z-Yl",
            }
          )
          .then(
            () => {
              Swal.fire({
                title: "Placed!",
                text: "Your order has been deleted.",
                icon: "success",
              });
            },
            (error) => {
              console.log(error);

              Swal.fire({
                title: "Sorry!",
                text: "Something went wrong.",
                icon: "error",
              });
            }
          );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = () => {
    if (user.login) {
      // Place Order
      Swal.fire({
        title: "Are you sure to place the order?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Place it!",
      }).then((result) => {
        if (result.isConfirmed) {
          sendEmail();
        }
      });
    } else {
      // Show Error
      Swal.fire({
        title: "Sorry!",
        text: "Please Login First to place the order",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://66c63bc2134eb8f43497236c.mockapi.io/products/" + id
        );

        setProduct(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  console.log(product);

  const handleAddFavoruites = async () => {
    try {
      const response = await axios.post(
        "https://66c63bc2134eb8f43497236c.mockapi.io/favourites",
        {
          name: product.name,
          userId: user.id,
          productId: product.id,
        }
      );

      dispatch(
        addToWishList({
          id: response.data?.id || "",
          name: product.name,
          userId: user.id,
          productId: product.id,
        })
      );

      if (response.status === 201) {
        message.success("Added to Favourites");
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Somewhat went Wrong");
    }
  };

  const handleRemoveFavourites = async () => {
    try {
      const IdToDelete = fvts.find((item) => item.productId === product.id);
      // API
      const response = await axios.delete(
        "https://66c63bc2134eb8f43497236c.mockapi.io/favourites/" +
          IdToDelete?.id
      );

      dispatch(removeFromWishList(product.id));

      if (response.status === 200) {
        message.success("Removed from Favorites");
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Somewhat went Wrong", err);
    }
  };

  if (loading) {
    return (
      <div className="product-spin">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="product-pic">
        <img src={product.image} />
      </div>
      <div className="product-content">
        <h1>
          <span>{product.name}</span>
          {fvts.find((item) => item.productId === id) ? (
            <FavoriteIcon
              style={{
                color: "red",
              }}
              fontSize="large"
              onClick={handleRemoveFavourites}
            />
          ) : (
            <FavoriteBorderIcon
              style={{
                color: "red",
              }}
              fontSize="large"
              onClick={handleAddFavoruites}
            />
          )}{" "}
        </h1>
        <h3>${product.price}</h3>
        <p>{product.desc}</p>
        <button onClick={handlePlaceOrder}>Buy Now</button>
      </div>
    </div>
  );
};

export default Product;
