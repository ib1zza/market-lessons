import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { AppRoutes } from "../../types/routes";
import s from "./Navigation.module.scss";
import Wrapper from "../../UI/Wrapper";

const Navigation = () => {
  const setStyles = (isActive: boolean) => (isActive ? s.active : "");

  return (
    <Wrapper>
      <div className={s.navBlock}>
        <div className={s.logo}>
          <NavLink to={AppRoutes.homePage}>
            <FontAwesomeIcon icon={faHouseChimney} /> React-Shopper
          </NavLink>
        </div>
        <div className={s.links}>
          <NavLink
            to={AppRoutes.allProductsPage}
            className={({ isActive }) => setStyles(isActive)}
          >
            Products
          </NavLink>

          <NavLink
            to={AppRoutes.aboutPage}
            className={({ isActive }) => setStyles(isActive)}
          >
            About
          </NavLink>
        </div>
        <div className={s.userFavouritesLinks}>
          <NavLink to={AppRoutes.favouritesPage}>
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>

          <NavLink to={AppRoutes.cartPage}>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navigation;
