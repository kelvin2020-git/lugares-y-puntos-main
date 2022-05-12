import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { VenueLocationIcon } from "./VenueLocationIcon";
export const MapView = () => {
  const [state] = useState({
    currentLocation: { lat: "14.047161", lng: "-87.226567" },
    zoom: 13,
  });
  const { currentLocation, zoom } = state;

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const Markerss = () => {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        console.log(map);
      },
    });

    return position.latitude !== 0 ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={true}
        icon={VenueLocationIcon}
      />
    ) : null;
  };

  return (
    <MapContainer center={currentLocation} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <LocationFinderDummy/> */}
      <Markerss />
    </MapContainer>
  );
};


