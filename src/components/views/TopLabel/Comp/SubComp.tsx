"use client";
import { AiOutlineClose } from "react-icons/ai";
import { cartContext } from "@/global/context";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";

const SubComp = () => {
  let {
    userData,
    loading,
    LogOut,
    sendEmailVerificationCode,
    updateUserNamePhoto,
  } = useContext(cartContext);

  const [isSideProfileOpen, setSideProfile] = useState(false);
  const [isUserEditingName, setUserEditingName] = useState(false);
  const [Username, setUserName] = useState("");

  const name = userData?.displayName;

  function handleEditName() {
    updateUserNamePhoto(Username);
    setUserEditingName(false);
  }

  return (
    <div>
      {userData ? (
        <div
          onClick={() => setSideProfile(true)}
          className="w-8 h-8 rounded-full flex  justify-center items-center bg-white "
        >
          {userData.photoUrl ? (
            <Image
              className="object-cover"
              width={300}
              height={300}
              src={userData.photoUrl}
              alt={userData.displayName}
            />
          ) : userData.displayName ? (
            <p className="text-sm text-blue-950">{userData.displayName.slice(0, 1)}</p>
          ) : (
            <p className="text-sm text-blue-950">N</p>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            href={"/signupauth"}
            className="bg-gray-800 py-1 px-2 rounded-md "
          >
            SignUp
          </Link>
          <Link
            href={"/signinauth"}
            className="bg-gray-800 py-1 px-2 rounded-md "
          >
            SignIn
          </Link>
        </div>
      )}

      <div
        className={`${
          isSideProfileOpen
            ? "visible translate-y-0"
            : "invisible -translate-y-full"
        } duration-300 absolute md:w-80 w-72 h-full right-0 top-0 bottom-0 z-50  bg-gray-700 py-4 px-4`}
      >
        <div className="flex justify-between items-center  py-2">
          <p className="text-2xl font-semibold">Profile</p>

          <div onClick={() => setSideProfile(false)} className="cursor-pointer">
            <AiOutlineClose size={26} />
          </div>
        </div>

        {userData && (
          <div className="text-center py-4 ">
            {/* // loading */}
            {loading && <div>Loading......</div>}

            {/* //editing name */}

            {isUserEditingName && (
              <div className="flex">
                <input
                  value={Username}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  className="text-gray-700 w-full outline-gray-300 rounded-l-md hover:outline-purple-600"
                />
                <button
                  onClick={handleEditName}
                  className="rounded-r-md py-1 px-2 bg-purple-600"
                >
                  Done
                </button>
              </div>
            )}
            <h3 className="text-xl font-semibold">
              <b>Name :</b> {name ? name : "Not Set"}
            </h3>
            {
              <button
                className="underline text-blue-600 text-sm"
                onClick={() => setUserEditingName(true)}
              >
                Edit Name
              </button>
            }
            <h4 className="text-lg ">
              <b>Email : </b>
              {userData.email}
            </h4>
            <p className="text-sm">
              <b>Is Email Verified :</b>{" "}
              {userData.emailVerified ? "Verified" : "Unverified"}
            </p>
            {!userData.emailVerified && (
              <button
                className="underline text-blue-600 text-sm"
                onClick={sendEmailVerificationCode}
              >
                Verify Email
              </button>
            )}
            <p className="my-2 text-xs text-red-600 font-light">
              Please check you inbox{" "}
            </p>
            <p className="my-2 text-xs text-red-600 font-light">
              No Change than refresh page
            </p>
            <button className="w-full border rounded-lg p-2" onClick={LogOut}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubComp;
