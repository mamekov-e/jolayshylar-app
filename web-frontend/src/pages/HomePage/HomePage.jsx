import React from "react";
import "./HomePage.css";
import passengerLinkImg from "../../assets/basehomepage/passengerLinkImg.png";
import partnerLinkImg from "../../assets/basehomepage/partnerLinkImg.png";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <div className="appTitleCard">
        <h2>Система Jolaýshylar</h2>
      </div>
      <div className="descriptionCard">
        <h3>
          Прежде чем начать пользоваться приложением Jolaýshylar, мы бы хотели
          попросить вас выбрать тип пользователя.
        </h3>
        <div className="roleRefCards">
          <div className="roleCard">
            <img src={passengerLinkImg} />
            <h4>
              Если вы используете общественный транспорт для передвижения и
              хотите посмотреть количество пассажиров на вашем маршруте, нажмите
              на кнопку “Пассажир”.
            </h4>
            <Link to={"/passengers"}>
              <button className="secondaryBtn">Пассажир</button>
            </Link>
          </div>
          <div className="roleCard">
            <img src={partnerLinkImg} />
            <h4>
              Если вы являетесь организацией, занимающейся введением маршрутов
              общественных транспортов или уже используете нашу систему, нажмите
              на кнопку “Партнер”.
            </h4>
            <Link to={"/partners"}>
              <button className="secondaryBtn">Партнер</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
