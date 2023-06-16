const matchExistingProductId = (originalData: any, newdata: any) => {
  for (let index = 0; index < originalData.length; index++) {
    const element = originalData[index];
    if (element.productId === newdata.productId) {

      return element;
     
    }
    
  }
}



export function cartReducer(state: any, action: any) {
  if (action.payload === "addToCart") {
      let response = matchExistingProductId(state.cart, action.data);
      if (!response) {
          return {
              cart: [...state.cart, action.data]
          }
      } else {
          let filterData = state.cart.filter((item: any) => item.productId !== response.productId)
          return {
              cart: [...filterData, action.data]
          }
      }
  } else if (action.payload === "removeToCart") {
      return " "
  } else if (action.payload === "updateToCart") {
      return state
  }
  return state
}




 
         
     
 























