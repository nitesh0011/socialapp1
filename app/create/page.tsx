"use client";

import React, { useState } from "react";
import axios from "axios";
import { UploadDropzone } from "@/utils/uploadthing";

const postPage = () => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [user, setUser] = useState({
    title: "",
    content: "",
    
  });
  const onPost = async () => {
    try {
      const response = await axios.post("/api/users/create", {
        ...user,
        imageUrl: uploadedFileUrl?uploadedFileUrl:"", // Add the uploaded file URL
      });
      console.log("this the code", ( response).data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="mb-5 text-2xl">Post creation</h1>
      <hr />
      <label htmlFor="title">title</label>

      <input
        className="p-2"
        placeholder="title"
        type="text"
        id="title"
        value={user.title}
        onChange={(e) => {
          setUser({ ...user, title: e.target.value });
        }}
      />

      <input
        className="p-2"
        placeholder="content"
        type="text"
        id="content"
        value={user.content}
        onChange={(e) => {
          setUser({ ...user, content: e.target.value });
        }}
      />

      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          const url = res[0].url
          setUploadedFileUrl(url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <button
        className="p-2 bg-blue-500 active:bg-blue-700 rounded-md mt-2 "
        onClick={onPost}
      >
        post
      </button>
    </div>
  );
};

export default postPage;
