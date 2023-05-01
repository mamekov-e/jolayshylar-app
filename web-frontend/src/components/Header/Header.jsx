import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import logo from "../../../public/logo.svg";
import Nav from "./Nav";
import navLinks from "../../staticData/frontData/navLinks.json"
import {AuthContext} from "../../contexts/useAuth.jsx";

export default function Header() {
    const {user, logoutUser} = useContext(AuthContext);

    return (
        <HeaderStyled>
            <Link className="link logo" to="/">
                <img className="logoImage" src={logo}/>
                <p className="appName">Jolaýshylar</p>
            </Link>
            <Nav links={navLinks}/>
            <div className="navLogin">
                {user ? (
                    <Link onClick={logoutUser}>Выйти</Link>
                ) : (
                    <Link to="/partners/login">Войти</Link>
                )}
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
