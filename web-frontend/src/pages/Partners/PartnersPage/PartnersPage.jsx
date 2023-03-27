import React, { useState } from "react";
import LoginPage from "../../AuthPages/LoginPage";
import PartnersMainPage from "./PartnersMainPage";

export default function PartnersPage() {
  const [authorized, setAuthorized] = useState(true);

  function auth() {
    setAuthorized(!authorized);
  }

  return (
    <>
      <p onClick={auth} style={{ position: "absolute" }}>
        ~
      </p>
      {authorized ? <PartnersMainPage /> : <LoginPage />}
    </>
  );
}
