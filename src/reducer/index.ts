import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
  } from "firebase/firestore";
  import { app } from "../firebase/firebase.config";
import { Product } from "../types";
import { TYPES } from "./action";
  
  const db = getFirestore(app);

  export const getCartucherasBts = (dispatch: (action: any) => void) => {
    const colRef = collection(db, "bts/Xq9UGyUn6d4OukEb1jPk/cartucheras");
    onSnapshot(colRef, (snapshot) => {
        let cartucheras:Product[] = [];
      snapshot.docs.forEach((doc) => {
        cartucheras.push({ ...doc.data(),id: doc.id  });

        console.log('doc', cartucheras)
      });
      dispatch({ type: "getProductById", payload: cartucheras });
    });
  };