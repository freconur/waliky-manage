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
  import { app } from "../firebase/firebase.config";
  import {
    ProductSoldPerMonth,
  } from "../types";
  
  const db = getFirestore(app);

  export const getSoldProductsPerMoth = (dispatch:(action:any)=>void, month:string) => {
    const colRef = collection(db, `/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${month}-2023`)
    onSnapshot(colRef, (snapshot) => {
        let products: ProductSoldPerMonth[] = []
        snapshot.docs.forEach((doc) => {
            products.push({...doc.data(), id:doc.id})
        });
        dispatch({type:"getSoldProductsPerMoth", payload: products})
    })
  }

 

