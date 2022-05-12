import { useNavigate } from "react-router-dom";
import appland from "../ui/appland.png";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { VenueLocationIcon } from "../map/VenueLocationIcon";
import { db, getDocs, collection } from "../../firebase/firebase-config";
export const HomeScreen = () => {
  const navigate = useNavigate();
  const { active: note } = useSelector((state) => state.place);
  const [formValues] = useForm(note);
  const { id, name, category, rang, lat, long, url } = formValues;
  const [refe, getrefe] = useState([]);

  const handleReturn = () => {
    navigate(-1);
  };

  const setrefe = async () => {
    try {
      const placesSnap = await getDocs(
        collection(db, `places/${id}/references`)
      );
      const places = [];

      placesSnap.forEach((doc) => {
        places.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      getrefe(places);
    } catch (error) {
      console.log(error);
    }
    setrefe();
  };

  useEffect(() => {
    setrefe();
  });

  return (
    <>
      <nav
        className="flex items-center justify-between flex-wrap bg-neutral-300
         p-6"
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={appland} alt="imagens" />
        </div>
        <div className="block lg:hidden"></div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>
          <div></div>
        </div>
        <div></div>
      </nav>

      <div className="container  mx-10 my-16  border-black border rounded  ">
        <div className="grid grid-cols-3 ml-2 mr-10">
          <div className="grid grid-cols-1 p-2 ml-6">
            <h5 className="text-2xl ml-28">Detalles</h5>
            <img src={url} alt="imagen" className="w-72 h-56 ml-3 p-4" />
            <h5 className=" text-2xl ml-28 mt-3">Ubicación</h5>
            <div className="w-72 h-48  ml-7 mb-4 bg-neutral-500">
              <MapContainer center={[lat, long]} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={[lat, long]} icon={VenueLocationIcon}>
                  <Popup>
                    <div>{name}</div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          <div className="  mr-7 mt-3  ">
            <div className="">
              <label className="w-10 h-8 mt-1 "> Nombre: </label>
              <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-8">
                {name}
              </label>
            </div>
            <div className="flex mt-2 mr-5">
              <label className="w-10 h-8 mt-1 "> Categoría: </label>
              <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                {category}
              </label>
            </div>

            <div className="flex mt-2">
              <label className="w-10 h-8 mt-1 "> Estado: </label>
              {rang <= 3 ? (
                <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                  Disponible
                </label>
              ) : (
                <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                  No disponible
                </label>
              )}
            </div>

            <div className="flex mt-2">
              <label className="w-10 h-8 mt-1 "> Distancia: </label>
              <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                {rang}
              </label>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <label className=" mt-2"> Latitud </label>
                <p className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ">
                  {lat}
                </p>
              </div>

              <p>
                <label className=" mt-2"> Longitud </label>
                <p className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ">
                  {long}
                </p>
              </p>
            </div>
            <button
              className=" m-10 h-9 ml-10 border rounded-md border-gray-500 "
              onClick={handleReturn}
            >
              Regresar
            </button>

            <div className="grid grid-cols-1 mt-20 "></div>
          </div>

          <div className="  ">
            <p>
              <h5 className="text-2xl ml-10 mt-3">Puntos de referencias </h5>
              <div className="w-60 h-48 p-4 ml-7 mb-9 bg-neutral-300">
                <table className="table">
                  <thead>
                    <tr className="grid grid-cols-2">
                      <th className="">Nombre </th>
                    </tr>
                  </thead>
                  <tbody>
                    {refe.map((item) => (
                      <tr key={item.id}>
                        <th className="text-left" id={item.id}>
                          {item.name}
                        </th>
                        <td className="flex "></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </p>
            <div className="grid grid-cols-2 mt-48 "></div>
          </div>
        </div>
      </div>
    </>
  );
};
