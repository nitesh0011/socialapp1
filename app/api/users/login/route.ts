
import { connect } from "@/app/dbconfig/dbconfig";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

export async function POST(request: NextRequest) {
  await connect();

  const modelNames = Object.keys(mongoose.models);
  console.log("models in mongodb",modelNames)
  
  try {
    const reqBody3 = await request.json();
    const { email, password } = reqBody3;

    console.log(reqBody3);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exit" },
        { status: 400 }
      );
    }

    //check password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
        return NextResponse.redirect('/login');
      }
    //create token data
    const TokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create actual token
    const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login succesfull",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
