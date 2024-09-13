import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="content">
        <h1>Your Own Foodie</h1>
        <p>Buy any thing from our store</p>
        <Link to="#">Scroll Products</Link>
      </div>
    </div>
  );
};

export default Home;
