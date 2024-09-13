import { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Order = () => {
  const user = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://66c63bc2134eb8f43497236c.mockapi.io/orders"
        );

        const filteredOrders = response.data.filter(
          (order) => order.userId === user.id
        );

        setOrders(filteredOrders);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <p>All of your current active orders</p>

      <div className="orders-cards">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="left">
              <img src={order.image} />
              <h1>{order.name}</h1>
            </div>
            <h3>${order.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
