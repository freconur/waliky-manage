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
import { currentMonth } from "../date/date";
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
export const getKawaiiProducts = async () => {
  const rta = await getDocs(collection(db, "kawaii"));
  const products: Product[] = [];
  rta.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  return products;
};


export const getBtsProducts = async () => {
  const bts = await getBtsCategories();
  let btsProducts: Product[] = [];
  // let productsBtsCategory:Product[] = []
  bts.map(async (category) => {
    const rta = await getDocs(collection(db,`/bts/${category.id}/${category.name}`));
    rta.forEach((doc) => {
      btsProducts.push({ ...doc.data(), id: doc.id });
    });
  });
  return new Promise((resolve:(value: Product[]) => void, reject) => {
      resolve(btsProducts)
  })
};
export const getAllProducts = async (dispatch:(action:any) => void) => {
  const bts = await getBtsProducts();
  const kawaii = await getKawaiiProducts();
  const allProducts:Product[] = bts.concat(kawaii)
  dispatch({type:"getAllProducts", payload: allProducts})
};
export const setProductToSell = async (product: Product) => {
  await addDoc(
    collection(
      db,
      "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale"
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
  const colRef = doc(db, "kawaii", `${InputId}`);
  findProduct = await getDoc(colRef);
  product = { ...findProduct.data(), idProduct: `${InputId}` };
  if (findProduct.exists()) {
    dispatch({ type: "getProductById", payload: product, payload2: "kawaii" });
  }

  btsCategories.map(async (category) => {
    const colRef = doc(db, `bts/${category.id}/${category.name}`, `${InputId}`);
    findProduct = await getDoc(colRef);
    product = { ...findProduct.data(), idProduct: `${InputId}` };
    if (findProduct.exists()) {
      dispatch({
        type: "getProductById",
        payload: product,
        payload2: `bts/${category.id}/${category.name}`,
      });
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
export const updateStockProduct = async (
  inputValues: InputValueVentas,
  currentProductSell: Product[],
  dispatch: (action: any) => void
) => {
  currentProductSell.map(async (currentProduct) => {
    const colRef = doc(
      db,
      `${currentProduct.pathProduct}`,
      `${currentProduct.idProduct}`
    );
    updateDoc(colRef, {
      // ...currentProduct,
      id: currentProduct.idProduct,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      state: currentProduct.state,
      stock: currentProduct.stock,
      marca: currentProduct.marca,
    });

    const docData = {
      idProduct: currentProduct.idProduct,
      name: currentProduct.name,
      price:currentProduct.price,
      timestamp: Timestamp.fromDate(new Date()),
      cantidad: currentProduct.cantidad,
    };
    await addDoc(
      collection(db, "/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/febrero-2023"),
      docData
    );
    await deleteDoc(
      doc(
        db,
        "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale",
        `${currentProduct.id}`
      )
    );
  });
  getCurrentProductSell(dispatch);
};
export const getOptions = (dispatch: (action: any) => void) => {
  const colRef = collection(
    db,
    "/registro-de-ventas/AGpZzU0AileZDyUkEyAd/options"
  );
  onSnapshot(colRef, (snapshot) => {
    const getOptions: Options[] = [];
    snapshot.docs.forEach((doc) => {
      getOptions.push({ ...doc.data() });
    });
    dispatch({ type: "getOptions", payload: getOptions });
  });
};

export const getProductsSold = (dispatch: (action: any) => void, month:string | void) => {
  let currentMonths:string = currentMonth()
  if(!month) {
    const colref = collection(db,`/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${currentMonths}-2023`);
    onSnapshot(colref, (snapshot) => {
      const getSolds: ProductSold[] = [];
      snapshot.docs.forEach((doc) => {
        getSolds.push({ ...doc.data(), id: doc.id });
      });
      dispatch({ type: "getProductsSold", payload: getSolds, payload2: currentMonths});
    });
  }else { 
    const colref = collection(db,`/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${month}-2023`);
    onSnapshot(colref, (snapshot) => {
      const getSolds: ProductSold[] = [];
      snapshot.docs.forEach((doc) => {
        getSolds.push({ ...doc.data(), id: doc.id });
      });
      dispatch({ type: "getProductsSold", payload: getSolds, payload2: month });
    });
  }
};

export const getCurrentProductSell = async (
  dispatch: (action: any) => void
) => {
  // const item = await getDocs(collection(db,"/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale"));
  const item = collection(db,"/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale");
  onSnapshot(item,(snapshot) => {
    const currentProductToSell: Product[] = [];
    snapshot.docs.forEach((doc) => {
      currentProductToSell.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getCurrentProductSell", payload: currentProductToSell });
  })
};

export const addCurrentProductToSell = (
  dispatch: (action: any) => void,
  product: Product,
  inputValues: InputValueVentas
) => {
  if (inputValues.location === "/registro-de-ventas") {
    console.log("addCurrentProductToSell", product);
    setProductToSell({ ...product, cantidad: inputValues.cantidad });
    getCurrentProductSell(dispatch);
  }
};
export const deleteCurrentProduct = async (dispatch:(action:any) => void, id:string) => {
  await deleteDoc(doc(db, "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale", id))
}

