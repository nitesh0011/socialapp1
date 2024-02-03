"use client";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import { UploadButton } from "@/utils/uploadthing";

export default function Profile() {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
 
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        if (response.data && response.data.user) {
          setName(response.data?.user?.username);
          setProfile(response.data?.user?.profile);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, [profile]);

  const updateProfile = async (photoUrl: string) => {
    try {
      // Send a PUT request to update the profile with the new photo URL
      const updateResponse = await axios.put("/api/users/me", {
        profile: photoUrl,
      });

      // Log the update response
      console.log("Profile update response:", updateResponse.data);

      // Update the local state with the new photo URL
      // setProfile(photoUrl);
    } catch (error:any) {
      console.error("Error updating profile:", error.message);
    } 
  };


  return (
    <div className="container mx-auto px-4">
      <Head>
        <p>Profile</p>
      </Head>

      {/* Header with profile image and name */}
      <header className="flex items-center mb-8">
        <Image
          src={profile}
          alt="Profile Picture"
          width={128}
          height={128}
          className="rounded-full mr-4"
        />
        <UploadButton
          appearance={{
            button:
              "ut-ready:bg-red-500 w-[80px] text-[12px]  ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
            container: "flex-row rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            // Do something with the response
            const url = res[0].url;
            console.log(url)
           

            // Update profile with the new photo URL
            updateProfile(url);
        
            // Display a success alert
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </header>
      <h1 className="text-2xl font-bold">{`username: ${name}`}</h1>

      {/* Main content with bio, skills, and contact information */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-4">Bio</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </main>
    </div>
  );
}
