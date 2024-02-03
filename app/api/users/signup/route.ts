import {connect} from "@/app/dbconfig/dbconfig"
import User from "@/app/models/userModel"
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"


export async function POST(request:NextRequest){
    try {
        await connect();
       const reqBody = await request.json();
       const {username,email,password,profile}=reqBody;

       console.log(reqBody)

       //user exit check
       const user = await User.findOne({email});
       if(user){
        return NextResponse.json({error:"user already exits"},{status:400})
       }
       //hash password
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)

       //create user 
       const newUser = new User({
        username,
        email,
        password:hashedPassword,
        profile,
       })
       
       const savedUser = await newUser.save()

       return NextResponse.json({message:"user createfd successfully"},savedUser)



    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}