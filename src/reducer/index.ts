import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  Timestamp
} from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import { InputValueVentas, Options, Product, SearchById } from "../types";
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

  const colRef = doc(db, "kawaii", inputValues.id);
  findProduct = await getDoc(colRef);
  product = findProduct.data();
  if (findProduct.exists()) {
    // localStorage.setItem('PRODUCT_BY_ID',JSON.stringify(colRef))
    return dispatch({ type: "getProductById", payload: product, payload2: "kawaii"});
  }

  btsCategories.map(async (category) => {
    const colRef = doc(
      db,
      `bts/${category.id}/${category.name}`,
      inputValues.id
    );
    findProduct = await getDoc(colRef);
    product = findProduct.data();
    if (findProduct.exists()) {
      return dispatch({ type: "getProductById", payload: product, payload2: `bts/${category.id}/${category.name}`});
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

export const updateStockProduct =  (
  path:string,
  inputValues:InputValueVentas,
  stock: number,
  product: Product
) => {
  const colRef = doc(db, path, inputValues.id);
  updateDoc(colRef, {
    stock: stock,
  });

  const docData = {
    idProduct: inputValues.id,
    name:product.name,
    timestamp:Timestamp.fromDate(new Date()),
    cantidad: inputValues.cantidad
  }
  addDoc(collection(db, "/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/febrero-2023"),docData);
  // const product = getDoc(colRef)
};

export const getOptions = (dispatch:(action:any) => void) => {
  const colRef =  collection(db, "/registro-de-ventas/AGpZzU0AileZDyUkEyAd/options");
  // const findOptions = await getDoc(colRef);
   onSnapshot(colRef, (snapshot) => {
const getOptions: Options[] = [];
    snapshot.docs.forEach((doc) => {
      // getOptions.push({...doc.data(), id: doc.id });
      getOptions.push({...doc.data()});
    });
    dispatch({ type: "getOptions", payload: getOptions });
  });
  // dispatch({type:"getOptions", payload: findOptions.data()})
}