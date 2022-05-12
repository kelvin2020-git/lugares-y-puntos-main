import Swal from "sweetalert2";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { loadPlaces } from "../helpers/loadNotes";
import { types } from "../types/types";
import { db, doc, setDoc, collection } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";

export const startNewPlace = () => {
  return async (dispatch, getState) => {
    // const { uid } = getState().auth;

    const newPlace = {
      name: "",
      category: "",
      status: "",
      rang: "",
      lat: "",
      long: "",
    };
    const docRef = collection(db, `places`);
    await setDoc(doc(docRef), newPlace);
    console.log(docRef);

    dispatch(activePlace(doc.id, newPlace));
  };
};

export const activePlace = (id, place) => ({
  type: types.placeActive,
  payload: {
    id,
    ...place,
  },
});

export const startLoadingPlaces = () => {
  return async (dispatch) => {
    const places = await loadPlaces();
    dispatch(setPlaces(places));
  };
};

export const setPlaces = (places) => ({
  type: types.placeLoad,
  payload: places,
});

export const startNewRefe = (id) => {
  return async (dispatch) => {
    const newRefe = {
      name: "Metro mall",
    };
    const docRef = collection(db, `places/${id}/references`);
    await setDoc(doc(docRef), newRefe);
    console.log(docRef);
    dispatch(NewRefe(id));
  };
};

export const startSavePlace = (note) => {
  return async (dispatch) => {
    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const noteRef = doc(db, `places/${note.id}`);
    await updateDoc(noteRef, noteToFirestore);
    dispatch(refreshPlace(note.id, noteToFirestore));
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activePlace } = getState().place;
    const fileUrl = await fileUpload(file);
    activePlace.url = fileUrl;
    dispatch(startSavePlace(activePlace));

    Swal.close();
  };
};

export const refreshPlace = (id, place) => ({
  type: types.placeUpdated,
  payload: {
    id,
    place: {
      id,
      ...place,
    },
  },
});

export const startDeleting = (id) => {
  return async (dispatch) => {
    const noteRef = doc(db, `places/${id}`);
    await deleteDoc(noteRef); 
    dispatch(deletePlace(id));   
  };
};

export const startDeletingrefe = (id,note) => {
  return async () => {
    const noteRef = doc(db, `places/${note.id}/references/${id}`);
    await deleteDoc(noteRef);

    
  };
};
export const deletePlace = (id) => ({
  type: types.placeDelete,
  payload: id,
});

export const NewRefe = (id) => ({
  type: types.newRefe,
  payload: id,
});
