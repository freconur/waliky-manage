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

import { currentMonth, MonthsAvailable, MothsAvailableForGraphics } from "../date/date";
import { app } from "../firebase/firebase.config";
import {
  Categories,
  InputValueVentas,
  MonthsAvailableType,
  Options,
  Product,
  ProductSold,
  ProductSoldPerMonth,
  ProductsPerMonth,
} from "../types";

const db = getFirestore(app);
const storage = getStorage(app);

export const getBtsCategories = async () => {
  const colRefBtsCategories = await getDocs(collection(db, "bts"));
  const btsCategories: Product[] = [];
  colRefBtsCategories.forEach((doc) => {
    btsCategories.push({ ...doc.data(), id: doc.id });
  });
  return btsCategories;
};

export const getBtsProducts = async () => {
  const bts = await getBtsCategories();
  let btsProducts: Product[] = [];
  // let productsBtsCategory:Product[] = []
  bts.map(async (category) => {
    const rta = await getDocs(
      collection(db, `/bts/${category.id}/${category.name}`)
    );
    rta.forEach((doc) => {
      btsProducts.push({
        ...doc.data(),
        id: doc.id,
        pathProduct: `/bts/${category.id}/${category.name}`,
      });
    });
  });
  return new Promise((resolve: (value: Product[]) => void, reject) => {
    resolve(btsProducts);
  });
};
export const getAllProducts = async (dispatch: (action: any) => void) => {
  const bts = await getBtsProducts();
  const kawaii = await getKawaiiProducts();
  const allProducts: Product[] = bts.concat(kawaii);
  dispatch({ type: "getAllProducts", payload: allProducts });
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
export const getCartucherasBts = async (dispatch: (action: any) => void) => {
  // const colRef = collection(db, "bts/Xq9UGyUn6d4OukEb1jPk/cartucherass");
  //   onSnapshot(colRef, (snapshot) => {
  //     let cartucheras: Product[] = [];
  //     snapshot.docs.forEach((doc) => {
  //       cartucheras.push({ ...doc.data(), id: doc.id });
  //     });
  //     dispatch({ type: "getCartucherasBts", payload: cartucheras });
  //   });
  // }

  await getDocs(collection(db, "kawaiia")).then((res) => {
    const products: Product[] = [];
    if (res.docs.length > 0) {
      res.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      dispatch({ type: "getCartucherasBts", payload: products });
    } else {
      dispatch({
        type: "getErrorProducts",
        payload: "ups, algo paso!, no se pudieron cargar los productos",
      });
    }
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
      price: currentProduct.price,
      timestamp: Timestamp.fromDate(new Date()),
      cantidad: currentProduct.cantidad,
    };
    await addDoc(
      collection(
        db,
        `/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${currentMonth()}-2023`
      ),
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

export const getProductsSold = (
  dispatch: (action: any) => void,
  month: string | void
) => {
  let currentMonths: string = currentMonth();
  if (!month) {
    const colref = collection(
      db,
      `/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${currentMonths}-2023`
    );
    onSnapshot(colref, (snapshot) => {
      const getSolds: ProductSold[] = [];
      snapshot.docs.forEach((doc) => {
        getSolds.push({ ...doc.data(), id: doc.id });
      });
      dispatch({
        type: "getProductsSold",
        payload: getSolds,
        payload2: currentMonths,
      });
    });
  } else {
    const colref = collection(
      db,
      `/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${month}-2023`
    );
    onSnapshot(colref, (snapshot) => {
      const getSolds: ProductSold[] = [];
      snapshot.docs.forEach((doc) => {
        getSolds.push({ ...doc.data(), id: doc.id });
      });
      dispatch({ type: "getProductsSold", payload: getSolds, payload2: month });
    });
  }
};
export const getAllProductsSoldPerMonth = async ():Promise<ProductsPerMonth[]> => {
 const MonthAviable:MonthsAvailableType[] = MothsAvailableForGraphics()
const allProductsMonthAviable:ProductsPerMonth[] = []
 MonthAviable.map(async month => {
  const colref = await getDocs(collection(db, `/registro-de-ventas/B4gSu9UHEHPAhVQ6U6C5/${month.nameMonth}-2023`));
    const getSolds: ProductSold[] = [];
    colref.docs.forEach((doc) => {
      getSolds.push({ ...doc.data(), id: doc.id });
    });
    const rtaProductsPerMonth: ProductsPerMonth = {
      id:month.id,
      nameMonth: month.nameMonth,
      products: getSolds
    }
    allProductsMonthAviable.push(rtaProductsPerMonth)
})
return new Promise((resolve: (value: ProductsPerMonth[]) => void, reject) => {
  resolve(allProductsMonthAviable);
});
//  return allProductsMonthAviable

}

export const dataforGraphics =  async (dispatch:(action:any) => void):Promise<void> => {
  const allProductsSoldPerMonths = await getAllProductsSoldPerMonth()
// SE OBTIENE LAS VENTAS HECHAS POR MESES
let sellPerMonth:number[] = [] 
setTimeout(() => {
  allProductsSoldPerMonths?.sort((a, b) => {
    const first = parseInt(`${a.id}`);
    const second = parseInt(`${b.id}`);
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
  allProductsSoldPerMonths.map( product => {
    let totalSales:number  = 0
    product.products?.map(item => {
      totalSales = totalSales + (parseInt(`${item.cantidad}`, 10) * parseFloat(`${item.price}`))
        })
        let totalSalesToString:string = totalSales.toString()
        sellPerMonth.push(totalSales)
      })
      //SE OBTINENE ARRAY DE LOS MESES DISPONIBLES
      const getNameMonths:string[] = []
      MothsAvailableForGraphics().map(month => {
        getNameMonths.push(`${month.nameMonth}`)
      })
      //SE OBTINENE ARRAY DE LOS MESES DISPONIBLES
      dispatch({ type: "dataForGraphics", payload: sellPerMonth, payload2: getNameMonths, payload3: allProductsSoldPerMonths});
}, 1000)
// console.log('allProductsSoldPerMonths', allProductsSoldPerMonths)
// SE OBTIENE LAS VENTAS HECHAS POR MESES
}


export const getCurrentProductSell = async (
  dispatch: (action: any) => void
) => {
  // const item = await getDocs(collection(db,"/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale"));
  const item = collection(
    db,
    "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale"
  );
  onSnapshot(item, (snapshot) => {
    const currentProductToSell: Product[] = [];
    snapshot.docs.forEach((doc) => {
      currentProductToSell.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getCurrentProductSell", payload: currentProductToSell });
  });
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
export const deleteCurrentProduct = async (
  dispatch: (action: any) => void,
  id: string
) => {
  await deleteDoc(
    doc(
      db,
      "/registro-de-ventas/WZyBQviis3XrLbqp6R0Y/currentSale/fPygxZMGLNZUyz0qPIZg/productsCurrentSale",
      id
    )
  );
};
export const getKawaiiProducts = async () => {
  const rta = await getDocs(collection(db, "kawaii"));
  const products: Product[] = [];
  rta.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  return products;
};

export const getCategories = async (dispatch: (action: any) => void) => {
  const res = collection(db, "categories");
  onSnapshot(res, (snapshot) => {
    const categories: Product[] = [];
    snapshot.docs.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getCagories", payload: categories });
  });
};
export const getSubcategories = async (
  dispatch: (action: any) => void,
  category: string,
  allCategories: Categories[]
) => {
  allCategories.map(async (item) => {
    if (item.name === category) {
      const subcategories: Product[] = [];
      const res = await getDocs(
        collection(db, `/categories/${item.id}/subcategorias`)
      );
      res.forEach((doc) => {
        subcategories.push({ ...doc.data(), id: doc.id });
      });
      // console.log('subcategories', subcategories)
      return dispatch({ type: "getSubcategories", payload: subcategories });
    }
  });
};
// export const uploadFile = async (dispatch:(action:any) => void, files:FileList | null, newProduct: Product) => {
export const uploadFile = async (
  dispatch: (action: any) => void,
  files: any | null,
  newProduct: Product
) => {
  const archivoRef = ref(
    storage,
    `/${newProduct.category}/${newProduct.subcategory}/${newProduct.name}`
  );
  await uploadBytes(archivoRef, files[0]);
  const urlImage = await getDownloadURL(archivoRef);
  if (urlImage) {
    dispatch({
      type: "warningFile",
      payload: "se cargo la imagen del producto",
    });
  }
  return urlImage;
};
export const getBrands = async (dispatch: (action: any) => void) => {
  const res = collection(db, "brands");
  onSnapshot(res, (snapshot) => {
    const brands: Product[] = [];
    snapshot.docs.forEach((doc) => {
      brands.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: "getBrands", payload: brands });
  });
};
export const validationValues = (
  dispatch: (action: any) => void,
  newProduct: Product,
  allSubcategories: Categories[]
) => {
  if (allSubcategories.length > 0) {
    const copiaNewProduct = { ...newProduct };
    delete copiaNewProduct.image;
    for (let prop in copiaNewProduct) {
      const key = prop as keyof Product;
      if (copiaNewProduct[key]?.toString() === "") {
        // console.log("debes de llenar todos los campos");
      }
    }
    return false;
  }
  if (allSubcategories.length === 0) {
    const copiaNewProduct = { ...newProduct };
    if (newProduct.image) {
      delete copiaNewProduct.subcategory;
      for (let prop in copiaNewProduct) {
        const key = prop as keyof Product;
        if (copiaNewProduct[key]?.toString() === "") {
          // console.log("debes de llenar todos los campos");
        }
      }
      return false;
    }
    delete copiaNewProduct.image;
    delete copiaNewProduct.subcategory;
    for (let prop in copiaNewProduct) {
      const key = prop as keyof Product;
      if (copiaNewProduct[key]?.toString() === "") {
        // console.log("debes de llenar todos los campos");
      }
    }
    return false;
  }
};
export const NewProductValues = async (
  dispatch: (action: any) => void,
  newProduct: Product,
  allCategories: Categories[]
) => {
  const btsCategories = await getBtsCategories();
  const findSubcategory = btsCategories.find(
    (category) => category.name === newProduct.subcategory
  );
  if (`${newProduct.image}`.length === 0) {
      console.log("tienes que agregar una imagen")
  } else {
    if (newProduct.subcategory) {
      const findCollection = allCategories.find(
        (item) => item.name === newProduct.category
      );
        await addDoc(
          collection(
            db,
            `/${findCollection?.name}/${findSubcategory?.id}/${newProduct.subcategory}`
          ),
          newProduct
        ).then(rta => {
          dispatch({ type: "warningFile", payload: "" });
          dispatch({ type: "addProductWarning", payload: "se agrego el producto satisfactoriamente" });
        }).catch(error => {dispatch({ type: "addProductWarning", payload: error })})
    } else {
      const findCollection = allCategories.find(
        (item) => item.name === newProduct.category
      );
      await addDoc(collection(db, `/${findCollection?.name}/`), newProduct)
      .then(rta => {
        dispatch({ type: "warningFile", payload: "" });
        dispatch({ type: "addProductWarning", payload: "se agrego el producto satisfactoriamente" });
      }).catch(error => {dispatch({ type: "addProductWarning", payload: error })})
    }
  }
};
export const updateItemProv = async (item: Product) => {
  const colRef = doc(db, `${item.pathProduct}`, `${item.id}`);
  updateDoc(colRef, {
    // ...currentProduct,
    category: item?.category,
    name: item?.name,
    price: item?.price,
    stock: item?.stock,
  });
  console.log("se agrego la categoria");
};
