import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";
export const PublicRoute = ({ isAuth, children }) => {
  return isAuth ? <Navigate to="/lugares" /> : children;
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
