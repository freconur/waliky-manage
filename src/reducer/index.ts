import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { Product, SearchById } from "../types";
import { TYPES } from "./action";

const db = getFirestore(app);

export const getBtsCategories = async () => {
  const colRefBtsCategories = await getDocs(collection(db, "bts"));
  const btsCategories: Product[] = [];
  colRefBtsCategories.forEach((doc) => {
    btsCategories.push({ ...doc.data(), id: doc.id });
  });
  return btsCategories;
};
export const getProductById = async (
  dispatch: (action: any) => void,
  inputValues: SearchById
) => {
  const btsCategories = await getBtsCategories();
  let findProduct;
  let product: Product | undefined;

  ////kawaii////
  const colRef = doc(db, "kawaii", inputValues.id);
  findProduct = await getDoc(colRef);
  product = findProduct.data();
  if (findProduct.exists()) {
    return dispatch({ type: "getProductById", payload: product });
  }
  /////bts////
  btsCategories.map(async (category) => {
    // const colRef = doc(db, "bts/Xq9UGyUn6d4OukEb1jPk/cartucheras", inputValues.id);
    const colRef = doc(
      db,
      `bts/${category.id}/${category.name}`,
      inputValues.id
    );
    findProduct = await getDoc(colRef);
    product = findProduct.data();
    if (findProduct.exists()) {
      return dispatch({ type: "getProductById", payload: product });
    }
  });
};
export const getCartucherasBts = (dispatch: (action: any) => void) => {
  const colRef = collection(db, "bts/Xq9UGyUn6d4OukEb1jPk/cartucheras");
  onSnapshot(colRef, (snapshot) => {
    let cartucheras: Product[] = [];
    snapshot.docs.forEach((doc) => {
      cartucheras.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getCartucherasBts", payload: cartucheras });
  });
};
