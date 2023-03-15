import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    deleteDoc,
    addDoc,
    onSnapshot,
    updateDoc,
    Timestamp,
  } from "firebase/firestore";
  import { getStorage } from "firebase/storage";
import { currentMonth } from "../date/date";
  
  import { app } from "../firebase/firebase.config";
import { NewPurchaseProduct } from "../types";
  
  
  const db = getFirestore(app);
  const storage = getStorage(app);

//   export const productsPurchase = async(dispatch:(action:any)=>void) => {
//     const products = await getProductsPurchase()

//     // console.log('products',products)
//   }
export const getProductsPurchase =  (dispatch:(action:any)=>void) => {
    const colRef =  collection(db,`/compras/dhvFlqZjmsbfGJ6i9IKK/compras-${currentMonth()}`)
    onSnapshot(colRef, (snapshot) => {
      const purchaseProduct: NewPurchaseProduct[] = [];
          snapshot.docs.forEach((doc) => {
            purchaseProduct.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "getProductsPurchase", payload: purchaseProduct });
        });
        
  }

export const updateProductPurchase = async (dispatch:(action:any)=>void, product:NewPurchaseProduct) => {
  const colRef = doc(
    db,
    `/compras/dhvFlqZjmsbfGJ6i9IKK/compras-${currentMonth()}`,
    `${product.id}`
  );
  console.log('colRef',colRef)
  await updateDoc(colRef, {
    name: product.name,
    cantidad: product.cantidad,
    costoTotal: product.costoTotal,
    costoUnitario: (`${(parseFloat(`${product.costoTotal}`) / parseInt(`${product.cantidad}`)).toFixed(2)}`).toString()
  }).then(res => {
    dispatch({type:"warningMessagePurchase", payload: `${product.name} se actualizo en la lista de compras`})
  })
}

export const deleteProductPurchase = async (productModal:NewPurchaseProduct | undefined) => {
  console.log('productModal', productModal)
  if(productModal) {
    await deleteDoc(doc(db, `/compras/dhvFlqZjmsbfGJ6i9IKK/compras-${currentMonth()}`,`${productModal?.id}` ));
    console.log('se elmino la compra')
  }
  // await deleteDoc(doc(db, `/compras/dhvFlqZjmsbfGJ6i9IKK/compras-${currentMonth()}`, productModal?.id));
}