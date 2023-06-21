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
  

interface indexError{
  [key: string]: string
}


export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const[errorsViauserCredential, setErrorsViauserCredential]= useState<indexError | "">("");
 const [userData, setuserData]= useState<any>();
 const[loading, setLoading]= useState(false);
 const [errorsOfFirebase, setErrorsOfFirebase] = useState({
  key: "",
  errorMessage: "",
});
 
 
 
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
 
 // Cartstate data 
 
  const initialValue = {
    cart: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialValue);


  
  
  useEffect(()=>{
    let cart = localStorage.getItem("cart") as string;
    if(cart === null){
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }else{
      initialValue.cart = JSON.parse(cart)

    }})


  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.cart)) 
  },[state.cart])

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
    <cartContext.Provider value={{ state, dispatch,
     userData, signUpUser,signInUser, SignUpViaGoogle, 
     loading, LogOut, sendEmailVerificationCode, updateUserNamePhoto, errorsOfFirebase }}>
      {children}
    </cartContext.Provider>
  );
};

export default ContextWrapper;
