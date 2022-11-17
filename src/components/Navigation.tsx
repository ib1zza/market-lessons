import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  const setStyles = (isActive: boolean) =>
    isActive ? "text-amber-50" : "text-amber-600 hover:text-amber-200";

  const StyledNavLink = styled.div``;

  return (
    <div
      className={
        "flex align-middle justify-start bg-gray-700 p-2 text-amber-400 text-2xl font-bold [&>:not(:last-child)]:mr-4"
      }
    >
      <NavLink
        to={"/products"}
        className={({ isActive }) => setStyles(isActive)}
      >
        Products
      </NavLink>

      <NavLink to={"/about"} className={({ isActive }) => setStyles(isActive)}>
        About
      </NavLink>

      <NavLink to={"/likes"} className={({ isActive }) => setStyles(isActive)}>
        Likes
      </NavLink>
    </div>
  );
};

export default Navigation;
