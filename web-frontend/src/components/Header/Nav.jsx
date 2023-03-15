import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Nav({ links }) {
  return (
    <NavUnlisted>
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          exact="true"
          className={({ isActive }) => (isActive ? "current" : undefined)}
        >
          <li>{link.name}</li>
        </NavLink>
      ))}
    </NavUnlisted>
  );
}

const NavUnlisted = styled.ul`
  display: flex;

  li {
    margin: 0 0.8em;
    list-style: none;
  }

  .current {
    li {
      font-weight: bold;
    }
  }
`;
