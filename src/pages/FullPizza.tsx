import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import loading from "../assets/img/loading.gif";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: string;
    about: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6346ff4404a6d457579e4887.mockapi.io/PizzaItem/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("ошибка при получении пипцы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="loading__container">
        <img className="loading" src={loading} alt="загрузка..." />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="full-pizza__block">
        <img className="full-pizza__image" src={pizza.imageUrl} alt="pizza" />
        <div className="full-pizza__text">
          <h2 className="full-pizza__title">{pizza.title}</h2>
          <h4 className="full-pizza__price">{pizza.price} ₽</h4>
          <h4 className="full-pizza__about">{pizza.about}</h4>
        </div>
        <div className="cart__bottom-buttons"></div>
      </div>
      <Link to="/PizzaTime" className="button button--black">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
