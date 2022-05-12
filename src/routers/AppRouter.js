import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { DashboardRoutes } from "./DashboardRoutes";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
import { Homelistscreen } from "../components/placelist/Homelistscreen";
import { HomeScreen } from "../components/home/HomeScreen";
import { startLoadingPlaces } from "../actions/place";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingPlaces(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Espere...</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/lugares/*"
          element={
            <PrivateRoute isAuth={isLoggedIn}>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PublicRoute isAuth={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />

        <Route path="/" element={<Homelistscreen />} />
        <Route path="/detalles/:id" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};
