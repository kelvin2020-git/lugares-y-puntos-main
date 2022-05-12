import { db, getDocs, collection } from "../firebase/firebase-config";

export const loadPlaces = async () => {
  const placesSnap = await getDocs(collection(db, `places`));
  const places = [];

  placesSnap.forEach((snapHijo) => {
    places.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });

  return places;
};
