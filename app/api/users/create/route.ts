import { connect } from "@/app/dbconfig/dbconfig";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import Post from "@/app/models/postModel";
import User from "@/app/models/userModel";

import { NextRequest, NextResponse } from "next/server";

interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  imageUrl: string; // Add imageUrl property
}

export async function POST(request: NextRequest) {
  
  try {
    await connect();
    const reqBody = await request.json();
    const { title, content,imageUrl } = reqBody;
    console.log(title, content,imageUrl);
    console.log(reqBody);

    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    const newPost = new Post({
      title,
      content,
      imageUrl,
      userId: user._id,
    });
    const savedPost = await newPost.save();
    user.posts.push(savedPost._id); 
   
    await user.save();
    
    return NextResponse.json(
      { message: "user posted successfully" },
      savedPost
    );
  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
