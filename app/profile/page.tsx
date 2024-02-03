'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profile from "../components/Profile";

// Assuming the 'content' property exists
interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null); // Add error state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Set loading before the request
        const response:any = await axios.get("/api/users/me");
        console.log(response);
        setPosts(response.data?.user?.posts);
      } catch (error:any) {
        setError(error); // Set error if fetching fails
        console.error(error);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Profile />
      <div className="min-h-screen flex items-center bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 rounded-lg mb-60 w-full">
          
          {loading ? (
            "Loading..."
          ) : error ? (
            <p className="text-red-500">{error.message}</p> // Display error message
          ) : (
            posts?.map((post, id) => (
              <div key={id} className="bg-white rounded-lg shadow-md p-4 w-48">
                <h2 className="text-2xl font-semibold tracking-tight mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700">{post.content}</p>
                <div className="mt-4">
                  <Image
                    src={post.imageUrl}
                    alt={post.title} // Use post title as alt text
                    width={200}
                    height={200}
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
