import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleInfo,
  faHeart,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { AppRoutes } from "../types/routes";

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
        to={AppRoutes.allProductsPage}
        className={({ isActive }) => setStyles(isActive)}
      >
        Products <FontAwesomeIcon icon={faShop} />
      </NavLink>

      <NavLink
        to={AppRoutes.aboutPage}
        className={({ isActive }) => setStyles(isActive)}
      >
        About <FontAwesomeIcon icon={faCircleInfo} />
      </NavLink>

      <NavLink
        to={AppRoutes.favouritesPage}
        className={({ isActive }) => setStyles(isActive)}
      >
        Likes <FontAwesomeIcon icon={faHeart} />
      </NavLink>

      <NavLink
        to={AppRoutes.cartPage}
        className={({ isActive }) => setStyles(isActive)}
      >
        Cart <FontAwesomeIcon icon={faCartShopping} />
      </NavLink>
    </div>
  );
};

export default Navigation;
