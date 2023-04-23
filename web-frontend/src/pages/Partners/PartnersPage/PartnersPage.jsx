import React, {useContext, useState} from "react";
import LoginPage from "../../AuthPages/LoginPage";
import PartnersMainPage from "./PartnersMainPage";
import {AuthContext} from "../../../contexts/useAuth.jsx";

export default function PartnersPage() {
  const {user} = useContext(AuthContext);

  return (
    <>
      {user ? <PartnersMainPage /> : <LoginPage />}
    </>
  );
}
