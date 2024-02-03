'use client'
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Logout = () => {
  const router = useRouter();
  const onlogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <button
        onClick={onlogout}
        className="p-2 bg-blue-500 active:bg-blue-700 rounded-md"
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
