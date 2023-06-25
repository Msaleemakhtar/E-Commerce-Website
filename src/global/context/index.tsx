"use client";

import React, { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducer";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider,
   createUserWithEmailAndPassword,
   onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, 
   signInWithPopup, signOut, updateProfile 
  } from "firebase/auth";
import { useRouter } from "next/navigation";
import BASE_PATH_FORAPI from '@/components/shared/BasePath';

  

interface indexError{
  [key: string]: string
}


export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const[errorsViauserCredential, setErrorsViauserCredential]= useState<indexError | "">("");
 const [userData, setuserData]= useState<any>();
 const[loading, setLoading]= useState(false);
 const[cartArray, setCartArray]= useState<any>([])
 
 const [errorsOfFirebase, setErrorsOfFirebase] = useState({
  key: "",
  errorMessage: "",
});
const [quantity, setQuantity] = useState(0);

useEffect(() => {
  if (cartArray.length !== 0) {
      setQuantity(cartArray.length);
  }
}, [cartArray])

async function fetchData() {
  if (userData) {
      let res = await fetch(`/api/cart?user_id=${userData.uuid}`);
      if (!res.ok) {
          throw new Error("Failed to Fetch")
      }
      let dataToreturn = await res.json();
      await setCartArray((prev: any) => dataToreturn.cartData);
      router.refresh();
      if (dataToreturn) {
          return true
      }
  }
}

useEffect(() => {
  fetchData();
}, [userData]);


   
   async function dispatch(payload: string, data: any) {
    if (payload === "addToCart") {
        console.log("func running of add to cart");
        await fetch(`/api/cart`, {
            method: "POST",
            body: JSON.stringify(data)
        });
    } else if (payload === "removeFromCart") {
        let dataa = await fetch(`/api/cart?product_id=${data.product_id}&user_id=${data.user_id}`, {
            method: "DELETE",
        });
        let NotData = await dataa.json();
    } else if (payload === "updateCart") {
        setLoading(true);
        let dataa = await fetch(`/api/cart`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        let NotData = await dataa.json();
        setLoading(false);
    }
    // let resp = await fetchCartData();
    // if (resp) {
    //     return "sucess"
    // } else {
    //     return "unSucess"
    // }
};



  const user = auth.currentUser;

  useEffect(()=>{
   onAuthStateChanged(auth, (user:any)=>{
    
     if(user){
       setuserData({
         displayName: user.displayName,
         email:user.email,
         uuid:user.uid,
         photoUrl:user.photoUrl,
         emailVerified:user.emailVerified
 
       })
     }else{
       setuserData(null);
     }
   });
  },[])

// SignUp via Google

let Provider = new GoogleAuthProvider()


function SignUpViaGoogle(){
  setLoading(true)
 return  signInWithPopup(auth, Provider).then((userData:any)=>{
    if(userData){
      setuserData({

        displayName:userData.user.displayName,
        email:userData.user.email,
        uuid:userData.user.uid,
        photoUrl:userData.user.photoURL,
     
      });
      router.push("/")
    }
    setLoading(false)
  })
}




// SignUp via Email & Password

function signUpUser(email:string, password:string){
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password).then((res:any)=>{
  setLoading(false);
  setErrorsViauserCredential({
    "error Messaeg" : "Eroor occureed while signup via email & password"
  })
  }).catch((res:any)=>{
    setLoading(false);
  });
  setLoading(false);

}

// SignIn via Email & Password
function signInUser(email:string, password:string){
  return  signInWithEmailAndPassword(auth, email, password).then((res:any)=>{
    setLoading(false);
    setErrorsViauserCredential({
      "error Messaeg" : "Eroor occureed while signin via email & password"
    })
    }).catch((res:any)=>{
      setLoading(false);
    });
    setLoading(false);
  
  }

// LogOut 

function LogOut(){
  setLoading(true);
  signOut(auth);
  setLoading(false);
  window.location.reload()
}



// email verification

function sendEmailVerificationCode() {
  setLoading(true);
  if (user) {
      sendEmailVerification(user).then((res: any) => {
      
          window.location.href = "/"
      })
      setLoading(false);
  }
}


// update user profile
function updateUserNamePhoto(userName:string, photoURL?:string) {
  setLoading(true);
  if(user){
    updateProfile(user, {
      displayName:userName,
      photoURL:"https://abdulbasit-self.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdulBasit.40cf649b.png&w=640&q=75"

    }).then(()=>{
      setLoading(false);
      window.location.reload()
    }).catch((error:any)=>{
      setLoading(false);
      console.log(error);
    })
  }
  
}
 
  return (   
    <cartContext.Provider value={{ cartArray, dispatch, quantity,
     userData, signUpUser,signInUser, SignUpViaGoogle, 
     loading, LogOut, sendEmailVerificationCode, updateUserNamePhoto, errorsOfFirebase }}>
      {children}
    </cartContext.Provider>
  );
};

export default ContextWrapper;
