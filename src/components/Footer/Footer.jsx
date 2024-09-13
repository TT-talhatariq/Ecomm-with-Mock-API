import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo">
        <span>
          <i class="fa-solid fa-fish"></i>
        </span>
        <span>Foodie</span>
      </div>

      <div className="link_list">
        <h3>Main Links</h3>
        <ul>
          <li>Order Tracking</li>
          <li>New Order</li>
          <li>Contact Us</li>
          <li>News & Blogs</li>
        </ul>
      </div>

      <div className="link_list">
        <h3>Support</h3>
        <ul>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms and Services</li>
        </ul>
      </div>

      <div className="new-letter">
        <h3>Join our News Letter </h3>
        <input type="text" placeholder="Enter your Email" />
        <h3>Follow Us</h3>
        <div className="social-icons">
          <i class="fa-brands fa-facebook fa-2x"></i>
          <i class="fa-brands fa-instagram fa-2x"></i>
          <i class="fa-brands fa-twitter fa-2x"></i>
          <i class="fa-brands fa-youtube fa-2x"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
