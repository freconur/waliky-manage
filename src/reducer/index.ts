import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { app } from "../firebase/firebase.config";
import {
  InputValueVentas,
  Options,
  Product,
  ProductSold,
  SearchById,
} from "../types";
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

export const setProductToSell = async (product: Product) => {
  await addDoc(
    collection(
      db,
      "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/29tuy4tlrTRio6sYJR6D/productsCurrentSale"
    ),
    product
  );
};

export const getProductById = async (
  dispatch: (action: any) => void,
  inputValues: InputValueVentas,
  InputId?: string
) => {
  const btsCategories = await getBtsCategories();
  let findProduct;
  let product: Product | undefined;
  console.log('pruebita', InputId)
  console.log('pruebita2', `${InputId}`)
  const colRef =  doc(db, "kawaii", `${InputId}`);
  findProduct = await getDoc(colRef);
  product = { ...findProduct.data(), id: `${InputId}`};
  if (findProduct.exists()) {
    dispatch({ type: "getProductById", payload: product, payload2: "kawaii" });
  }

  btsCategories.map(async (category) => {
    const colRef = doc(
      db,
      `bts/${category.id}/${category.name}`,
      `${InputId}`
    );
    findProduct = await getDoc(colRef);
    product = { ...findProduct.data(), id: `${InputId}` };
    if (findProduct.exists()) {
      dispatch({
        type: "getProductById",
        payload: product,
        payload2: `bts/${category.id}/${category.name}`,
      });
    }
  });
  // if (inputValues.location === "/registro-de-ventas") {
  //   setProductToSell(product);
  //   getCurrentProductSell(dispatch)
  // }
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

export const updateStockProduct = (
  path: string,
  inputValues: InputValueVentas,
  stock: number,
  product: Product
) => {
  const colRef = doc(db, path, inputValues.id);
  updateDoc(colRef, {
    stock: stock,
  });

  const docData = {
    idProduct: inputValues.id,
    name: product.name,
    timestamp: Timestamp.fromDate(new Date()),
    cantidad: inputValues.cantidad,
  };
  addDoc(
    collection(db, "/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/febrero-2023"),
    docData
  );
  // const product = getDoc(colRef)
};

export const getOptions = (dispatch: (action: any) => void) => {
  const colRef = collection(
    db,
    "/registro-de-ventas/AGpZzU0AileZDyUkEyAd/options"
  );
  // const findOptions = await getDoc(colRef);
  onSnapshot(colRef, (snapshot) => {
    const getOptions: Options[] = [];
    snapshot.docs.forEach((doc) => {
      // getOptions.push({...doc.data(), id: doc.id });
      getOptions.push({ ...doc.data() });
    });
    dispatch({ type: "getOptions", payload: getOptions });
  });
  // dispatch({type:"getOptions", payload: findOptions.data()})
};

export const getProductsSold = (dispatch: (action: any) => void) => {
  const colref = collection(
    db,
    "/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/febrero-2023"
  );
  onSnapshot(colref, (snapshot) => {
    const getSolds: ProductSold[] = [];
    snapshot.docs.forEach((doc) => {
      getSolds.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getProductsSold", payload: getSolds });
  });
};

export const getCurrentProductSell = (dispatch:(action:any) => void) => {
  const colref = collection(
    db,
    "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/29tuy4tlrTRio6sYJR6D/productsCurrentSale"
  );
  onSnapshot(colref, (snapshot) => {
    const getCurrentProducts: ProductSold[] = [];
    snapshot.docs.forEach((doc) => {
      // getCurrentProducts.push({ ...doc.data(), id: doc.id });
      getCurrentProducts.push({...doc.data()});
    });
    dispatch({ type: "getCurrentProductSell", payload: getCurrentProducts });
  });
}

export const addCurrentProductToSell = (dispatch:(action:any) => void, product:Product ,inputValues:InputValueVentas) => {
if (inputValues.location === "/registro-de-ventas") {
  console.log('addCurrentProductToSell', product)
    setProductToSell(product);
    getCurrentProductSell(dispatch)
  }
}