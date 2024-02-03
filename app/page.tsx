"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { FcLike } from "react-icons/fc";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(false)
        const response = await axios.get("/api/users/home");
        const usersData:any = response.data?.users;
        console.log(usersData);
        setUsersData(usersData);
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);



  return (
<div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Users Data:</h1>
      {loading?"loading...":usersData?.map((user:any, userIndex:any) => (
        <div key={userIndex} className="mb-8  flex flex-col items-center">
          
          
          
          {user?.posts?.map((post:any, postIndex:any) => (
            <div key={postIndex} className="mb-4">
              
              <p className="mb-2">caption: {post.title}</p>
             
              <div className="flex flex-col">
                <Image className="rounded-lg" src={post.imageUrl} alt="image" width={300} height={300}></Image>
                <p className="text-2xl text-blue-300" ><FcLike /></p>
                <p>132 likes</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
