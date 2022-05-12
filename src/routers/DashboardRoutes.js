import { Routes, Route } from "react-router-dom";

import { Placelistscreen } from "../components/placelist/Placelistscreen";
import { Placeditar } from "../components/place/Placeditar";
import { PlaceScreen } from "../components/place/PlaceScreen";
import { PlaceNew } from "../components/place/PlaceNew";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Placelistscreen />} />
          <Route path="/detalle/:id" element={<PlaceScreen />} />
          <Route path="/detalle/:id/editar/:id" element={<Placeditar />} />
          <Route path="/nuevo" element={<PlaceNew />} />
        </Routes>
      </div>
    </>
  );
};
