import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import appland from "../ui/appland.png";
import { useForm } from "../../hooks/useForm";
import {
  activePlace,
  startSavePlace,
  startUploading,
} from "../../actions/place";
import { VenueLocationIcon } from "../map/VenueLocationIcon";

export const Placeditar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { active: note } = useSelector((state) => state.place);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { name, lat, long, category, rang, url } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  const handleReturn = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(activePlace(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleSave = () => {
    navigate(-1);
    dispatch(startSavePlace(note));
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const Markerss = () => {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        map.flyTo(event.latlng);
      },
    });

    return position.latitude !== null ? (
      <Marker
        position={[position.latitude, position.longitude]}
        interactive={true}
        icon={VenueLocationIcon}
      />
    ) : null;
  };

  return (
    <>
      <nav
        className="flex items-center justify-between flex-wrap bg-neutral-300
         p-6"
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={appland} alt="imagen" />
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
            <h5 className="text-2xl ml-28">Editar lugar</h5>

            <div className="  mr-7 mt-3  ">
              <h3 className="ml-1">Complete los campos</h3>
              <h3 className="ml-1">requeridos:</h3>
              <div className="flex mt-2">
                <label className="w-10 h-8 mt-1 "> Nombre: </label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="w-40   h-8 px-1 py-1 text-gray-400 border rounded border-gray-200 ml-14"
                ></input>
              </div>
              <div className="flex mt-2 mr-5">
                <label className="w-10 h-8 mt-1 "> Categoría: </label>

                <select
                  className="w-40   h-8 px-1 py-1 text-gray-400 border rounded border-gray-200 ml-14"
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                >
                  <option onChange={handleInputChange}>Filtrado por</option>
                  <option value="Catedral">Iglesias Coloniales</option>
                  <option value="Centro turistico">Centro Turistico</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Hotel">Hoteles</option>
                  <option value="Parque">Parques</option>
                  <option value="Edificio gubernamental">
                    Edificios Gubernamentales
                  </option>
                  <option value="Museo">Museos</option>
                  <option value="Aeropuerto">Aeropuerto</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Centro educativo">Centro educativo</option>
                  <option value="Centro comercial">Centro comercial</option>
                </select>
              </div>

              <div className="flex mt-2"></div>

              <label className="w-10 h-8 mt-1 ">Rango de disponibilidad:</label>
              <input
                type="text"
                placeholder=""
                name="rang"
                value={rang}
                onChange={handleInputChange}
                autoComplete="off"
                className="w-40   h-8 px-1 py-1 text-gray-400 border rounded border-gray-200 ml-3"
              ></input>

              <h5 className=" text-2xl ml-28 mt-3">Ubicación</h5>
              <div className="w-72 h-48  ml-7 mb-9 bg-neutral-500">
                <MapContainer
                  center={{ lat: "14.047161", lng: "-87.226567" }}
                  zoom={13}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <Markerss />
                </MapContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1">
            {selectedImage ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Thumb"
                  className="w-80 h-56 ml-3 p-4"
                />
              </div>
            ) : (
              <img src={url} alt="" className="w-80 h-56 ml-3 p-4" />
            )}

            <div>
              <label className="p-3 ml-10">Subir Foto</label>

              <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={imageChange}
              />
              <button
                className="btn p-1 w-20 ml-20 border rounded text-gray border-gray-300 hover:border-transparent hover:text-teal-500 hover:bg-white"
                onClick={handlePictureClick}
              >
                Foto
              </button>
            </div>

            <label className=" mt-2"> Latitud:{position.latitude} </label>

            <input
              type="text"
              id="lat"
              name="lat"
              value={lat}
              onChange={handleInputChange}
              autoComplete="off"
              className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500"
            ></input>

            <label className=" mt-2"> Longitud:{position.longitude} </label>
            <input
              type="text"
              id="long"
              name="long"
              value={long}
              onChange={handleInputChange}
              autoComplete="off"
              className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500"
            ></input>
            <div className=" mt-2  grid grid-cols-2">
              <div className="mb-4">
                <button
                  className="w-16 m-2  p-1 ml-40  border rounded-md border-gray-500 bg-blue-500"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>

              <div className="mb-4">
                <button
                  className="w-16 m-2  p-1 ml-40  border rounded-md border-gray-500 bg-red-500"
                  onClick={handleReturn}
                >
                  Cancelar
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
