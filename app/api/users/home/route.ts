import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/app/dbconfig/dbconfig";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const users = await User.find({}).populate('posts'); // Retrieve all users
    return NextResponse.json({ message: "All users found", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({message:"Internal server error",  status: 500 });
  }
}
