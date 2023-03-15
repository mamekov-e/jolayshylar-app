import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../public/logo.svg";
import profile from "../../assets/header/profile.svg";
import Nav from "./Nav";

const links = [
  { name: "Пассажирам", path: "/passengers" },
  { name: "Партнерам", path: "/partners" },
  { name: "О проекте", path: "/about" },
  { name: "Контакты", path: "/contacts" },
];

export default function Header() {
  const isLoggedIn = true;

  return (
    <HeaderStyled>
      <Link className="link logo" to="/">
        <img className="logoImage" src={logo} />
        <p className="appName">Jolaýshylar</p>
      </Link>
      <Nav links={links} />
      <div className="navLogin">
        {isLoggedIn && <img className="profileIcon" src={profile} />}
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  .logo {
    display: flex;
    align-items: center;
  }

  .logoImage {
    width: 41px;
    height: 40px;
  }

  .appName {
    font-weight: 400;
    line-height: 24px;
    margin-left: 10px;
  }

  .navLogin {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .profileIcon {
    margin-left: 130px;
  }
`;
