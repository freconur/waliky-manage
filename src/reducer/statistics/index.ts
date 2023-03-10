import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { type } from "os";
import { app } from "../../firebase/firebase.config";
import { DataPerYear } from "../../types";

const db = getFirestore(app);
const storage = getStorage(app);

export const Data2022 = async (dispatch: (action: any) => void) => {
  const colRefDataPerYear = await getDocs(
    collection(
      db,
      "/registro-de-ventas/7UFfjMMZ2SCyCKgPAdHb/resultado-del-ejercicio"
    )
  );
  console.log("colRefDataPerYear", colRefDataPerYear);
  const dataPerYear: DataPerYear[] = [];
  colRefDataPerYear.forEach((doc) => {
    dataPerYear.push({ ...doc.data(), id: doc.id });
  });
  dispatch({type:"getDataPerYear", payload: dataPerYear})
    // return dataPerYear;
};
