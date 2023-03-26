import React from "react";
import "./PartnersPage.css";
import partnersMainPageData from "../../../staticData/partnersHomePageData.json";
import Card from "../../../components/Cards/Card";

export default function PartnersMainPage() {
  const cards = partnersMainPageData.map((data) => {
    return <Card key={data.btnName} data={data} />;
  });

  return (
    <main>
      <div className="welcomeCard">
        <h2>
          Добро пожаловать, представитель компании City Transportation System!
        </h2>
        <h3>Рады приветствовать вас в нашем приложении Jolaýshylar.</h3>
        <h3>
          Здесь вы можете управлять своими маршрутами, просматривать
          пассажиропоток в реальном времени и экспортировать данные для отчета.
        </h3>
      </div>
      <div className="sectionCards">{cards}</div>
    </main>
  );
}
