import { useEffect, useMemo, useState } from "react";
import { db, getDocs, collection } from "../../firebase/firebase-config";
import { HomeCard } from "./HomeCard";
import { useNavigate } from "react-router-dom";
import appland from "../ui/appland.png";
export const HomeList = () => {
  const [lista, getlista] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [inputselect, Selecttext] = useState("");
  const [select, setSelect] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/auth/login", {
      replace: true,
    });
  };
  const setlista = async () => {
    try {
      const placesSnap = await getDocs(collection(db, `places`));
      const places = [];

      placesSnap.forEach((doc) => {
        places.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      getlista(places);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setlista();
  }, []);

  const searchplaces = (e) => {
    e.preventDefault();
    setSearch(text);
    setSelect(inputselect);
  };

  const filteredList = useMemo(
    () =>
      lista.filter((list) => {
        console.log("process");
        return (
          list.name.toString().toLowerCase().includes(search.toLowerCase()) &&
          list.category.toString().toLowerCase().includes(select.toLowerCase())
        );
      }),
    [search, lista, select]
  );

  return (
    <>
      <nav
        className="flex items-center justify-between flex-wrap bg-neutral-300
         p-6"
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src={appland} alt="imagen" />

          <span className="font-semibold text-xl tracking-tight"> </span>
        </div>
        <form
          className=" grid grid-cols-2"
          onSubmit={(e) => {
            searchplaces(e);
          }}
        >
          <div className="text-sm  ">
            <input
              placeholder="Buscar lugar ....."
              className="form-control "
              name="search"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <select
              label="categoria"
              onChange={(e) => {
                Selecttext(e.target.value);
              }}
              className="w-40     text-gray-400 border rounded border-gray-200 ml-1"
              value={inputselect}
            >
              <option>Filtrado por</option>
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
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow ">
              <button
                className=" text-sm  px-3 py-1 ml-4 border rounded text-gray-500 border-gray-500 hover:border-transparent hover:text-teal-500 hover:bg-white "
                type="submit"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>

        <div>
          <button
            href="#"
            className=" text-sm px-3 py-1  border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white "
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </nav>

      <div className="container  mx-10 my-20  border-black border rounded  ">
        <p className="text-2xl font-bold p-2 m-2">Lugares</p>
        <div className="grid grid-cols-4  ">
          {filteredList.length === 0 ? (
            <div className="alert alert-info">No se encontro ningún lugar</div>
          ) : (
            filteredList &&
            filteredList.map((places) => (
              <HomeCard key={places.id} {...places} />
            ))
          )}
        </div>
      </div>
    </>
  );
};
