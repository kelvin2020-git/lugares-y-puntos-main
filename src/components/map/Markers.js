import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
export const Markers = () => {
  return (
    <div>
      <Marker
        position={{ lat: "14.074216432857902", lng: "-87.16202726556702" }}
        icon={VenueLocationIcon}
      ></Marker>
    </div>
  );
};
