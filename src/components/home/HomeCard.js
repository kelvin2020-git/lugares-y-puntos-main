import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activePlace } from "../../actions/place";
export const HomeCard = ({ id, name, category, rang, lat, long, url }) => {
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

  return (
    <div className="grid grid-cols-1 p-1">
      <div className=" flex  border rounded  border-white w-full bg-gray-300 h-auto">
        <div className="flex mb-4">
          <div className="w-1/2 h-40 p-4">
            <img src={url} className="w-32 h-28" alt="" />
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
              <label>
                <label className=""></label>
              </label>
              <div className="mt-2">
                <div>
                  <label className="text-red-500">distancias: {rang} kms</label>
                </div>
              </div>
            </div>
            <div className="mb-1">
              <Link
                className="ml-10 m-4"
                to={`detalles/${id}`}
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
