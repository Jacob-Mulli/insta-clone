"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import { useState } from "react";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log(session);

  return (
    <div className="sticky top-0 z-30 p-3 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto ">
        {/*---logo ----*/}
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="/instalogo.webp" // Corrected image path
            width={96}
            height={96}
            alt="instagram logo"
          />
        </Link>

        <Link href="/" className="lg:hidden ">
          <Image
            src="/instalg.webp" // Corrected image path
            width={40}
            height={40}
            alt="instagram logo"
          />
        </Link>

        {/*--- Search input ----*/}

        <input
          type="text"
          placeholder="Search"
          className=" bg-gray-50 border-gray-200 rounded text-sm w-full py-2 px-2 max-w-[210px]"
        />

        {/*---menu items  ----*/}

        {session ? (
          <div className="flex items-center gap-2">
            <IoMdAddCircleOutline
              className="text-2xl transition duration-300 cursor-pointer tranform hover:scale-125 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />

            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm font-semibold text-blue-500"
          >
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <HiCamera className="text-5xl text-gray-400 cursor-pointer" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Please enter you caption..."
            className="w-full m-4 text-center border-none outline-none focus:ring-0"
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="w-full p-2 text-white bg-red-600 rounded-lg shadow-md hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">
            Upload Post
          </button>
          <AiOutlineClose
            className="absolute transition duration-300 cursor-pointer top-2 right-2 hover:text-red-600"
            onClick={() => setIsOpen(false)}
          />

          <div>
            <h1>Modal</h1>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
