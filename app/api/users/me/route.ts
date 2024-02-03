import mongoose from "mongoose";
import {connect} from "@/app/dbconfig/dbconfig";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/userModel";


connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(mongoose.models)
    const user = await User.findOne({ _id: userId }).populate("posts") // Populate posts
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Ensure posts are included in the response
    return NextResponse.json({ message: "user found", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}



export async function PUT(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);
    const { profile } = await request.json();

    // Update user profile
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { profile },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        new Error("User not found or unable to update profile"),
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}