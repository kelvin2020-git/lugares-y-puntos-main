import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { activePlace, startDeleting, startNewRefe } from "../../actions/place";
import appland from "../ui/appland.png";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { db, getDocs, doc, collection } from "../../firebase/firebase-config";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { VenueLocationIcon } from "../map/VenueLocationIcon";
import { deleteDoc, updateDoc } from "firebase/firestore";

export const DetailsPlace = () => {
  const navigate = useNavigate();
  const { active: note } = useSelector((state) => state.place);
  const [formValues] = useForm(note);
  const { id, name, category, rang, lat, long, url } = formValues;

  const dispatch = useDispatch();
  const handleeditar = () => {
    dispatch(
      activePlace(id, {
        name,
        category,

        rang,
        lat,
        long,
        url,
      })
    );
  };
  const handleDelete = () => {
    Swal.fire({
      title: "¿Desea eliminar este lugar?",
      text: "Sus datos se borraran de formar permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.value) {
        navigate(-1);
        dispatch(startDeleting(id));

        console.log("*si se elimino el lugar*");
      } else {
        console.log("*no se elimino el lugar*");
      }
    });
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const handleAddRefe = () => {
    console.log(id);

    dispatch(startNewRefe(id));
  };

  const handleDeletere = (id) => {
    return async () => {
      const noteRef = doc(db, `places/${note.id}/references/${id}`);
      await deleteDoc(noteRef);
    };
  };
  const handleeditre = (id) => {
    return async () => {
      setValues(values);

      const noteRef = doc(db, `places/${note.id}/references/${id}`);
      await updateDoc(noteRef, values);
    };
  };

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: false,
      }
    );
  }, []);

  const [refe, getrefe] = useState([]);

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
  };

  useEffect(() => {
    setrefe();
  });

  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (evt) => {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    const { target } = evt;
    const { name, value } = target;
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
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
                  <CircleMarker
                    className="circle"
                    radius={10}
                    center={[lat, long]}
                    color={"#000080"}
                    width={0.5}
                    fillColor={"blue"}
                    fillOpacity={0.5}
                    stroke={"black"}
                  ></CircleMarker>
                  <Popup>
                    <div>{name}</div>
                  </Popup>
                </Marker>
                <Marker
                  position={[state.latitude, state.longitude]}
                  icon={VenueLocationIcon}
                ></Marker>
              </MapContainer>
            </div>
          </div>
          <div className="  mr-7 mt-3  ">
            <h3 className="ml-3 text-2/1">{name}</h3>
            <div className="flex mt-2 mr-5">
              <label className="w-10 h-8 mt-1 "> categoría: </label>
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
                  no disponible
                </label>
              )}

              {/* <label className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                {status}
              </label> */}
            </div>

            <div className="flex mt-2">
              <label className="w-10 h-8 mt-1 "> Distancia: </label>
              <p className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ml-14">
                {rang}
              </p>
            </div>

            <div className="flex mt-2"></div>

            <div className="grid grid-cols-2">
              <p>
                <label className=" mt-2"> Latitud </label>
                <p className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ">
                  {lat}
                </p>
              </p>

              <p>
                <label className=" mt-2"> Longitud </label>
                <p className=" w-40   h-8 px-1 py-1 text-gray-400 border rounded-md border-gray-500 ">
                  {long}
                </p>
              </p>
            </div>
            <button
              className=" m-10 h-9 ml-10  border rounded text-gray-400 border-gray-400 hover:border-transparent hover:text-teal-500 hover:bg-white "
              onClick={handleReturn}
            >
              Regresar
            </button>

            <div className="grid grid-cols-1 mt-12 "></div>
          </div>

          <div className=" container ">
            <h5 className="text-2xl ml-28 m-1">Puntos de referencias</h5>
            <div className="w-90 h-48 p-4 ml-20 mb-9 bg-neutral-300 ">
              <table className="table">
                <thead>
                  <tr className="grid grid-cols-2">
                    <th className="">Nombre </th>

                    <th className=" ml-20">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {refe.map((item) => (
                    <tr key={item.id} className="grid grid-cols-3">
                      <tr className="text-left w-40">{item.name}</tr>
                      <input
                        className="text-left  text-gray-400 border rounded border-gray-200"
                        name="name"
                        id="name"
                        onChange={handleChange}
                      ></input>
                      <td className="flex ml-10">
                        <button
                          className="  p-3 mr-4 border rounded text-white border-green-600  hover:border-transparent hover:text-white hover:bg-green-300  bg-green-400"
                          onClick={handleeditre(item.id)}
                        ></button>
                        <button
                          className="  p-3 mr-6 border rounded text-white border-red-600  hover:border-transparent hover:text-white hover:bg-red-300  bg-red-400"
                          onClick={handleDeletere(item.id)}
                        ></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1  ">
              <label className=" ml-28 w-10 h-8 mt-3 ">
              
                Agregar referencia:
              </label>
              <button
                className=" w-28 text-end mb-3 ml-60  border rounded text-gray-400 border-gray-400 hover:border-transparent hover:text-teal-500 hover:bg-white "
                onClick={handleAddRefe}
              >
                Nueva
              </button>
            </div>

            <div className="grid grid-cols-2 mt-28 ">
              <div>
                <Link
                  className=" mt-40 p-1  ml-20  mr-10 text-center border rounded text-white border-green-600 hover:border-transparent hover:text-white hover:bg-green-400 bg-green-500"
                  to={`editar/${id}`}
                  onClick={handleeditar}
                >
                  Editar
                </Link>
              </div>
              <div>
                <button
                  className="  p-1 ml-20 mr-10 text-center border rounded text-white border-red-600  hover:border-transparent hover:text-white hover:bg-red-300  bg-red-400"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
