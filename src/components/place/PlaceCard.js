import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activePlace, startDeleting } from "../../actions/place";
export const PlaceCard = ({ id, name, category, rang, lat, long, url }) => {
  const dispatch = useDispatch();
  const handleEntryClick = () => {
    dispatch(
      activePlace(id, {
        id,
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
    dispatch(startDeleting(id));
  };

  return (
    <div className="grid grid-cols-1 p-1">
      <div className=" flex  border rounded  border-white w-full bg-gray-300 h-auto">
        <div className="flex mb-4">
          <div className="w-1/2 h-40 p-4">
            <img src={url} className="w-32 h-28" alt="imagen" />
            <div className="grid grid-cols-2 m-3">
              <Link
                className="  p-3 w-7 h-6 text-center border rounded text-green-500 border-green-600 hover:border-transparent hover:text-green-400 hover:bg-green-400 bg-green-500"
                to={`detalle/${id}/editar/${id}`}
                onClick={handleEntryClick}
              ></Link>
              <button
                className=" p-3  w-5 h-5 text-center border rounded text-white border-red-600  hover:border-transparent hover:text-white hover:bg-red-300  bg-red-400"
                onClick={handleDelete}
              ></button>
            </div>
          </div>
          <div className=" w-1/2 h-40">
            <h5 className="p-1">{name}</h5>
            <h5 className="p-1">{category}</h5>
            {rang <= 3 ? (
              <label className="p-1">Disponible</label>
            ) : (
              <label className="p-1">No disponible</label>
            )}
            {/* {
                                ( alter_ego !== characters ) 
                                    && <p className="">{ characters }</p>
                            } */}
            <div className="p-1">
              <label></label>
              <div className="mt-2">
                <div>
                  <label className="text-red-500">Distancias: {rang} kms</label>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <Link
                className="ml-10 m-4"
                to={`detalle/${id}`}
                onClick={handleEntryClick}
              >
                Ver detalles...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
