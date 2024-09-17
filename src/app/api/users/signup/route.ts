import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, username } = reqBody;

        if (!email || !password || !username) {
            return NextResponse.json({ error: "Please provide all fields" }, {status: 400});
        }
        const user = await User.findOne({ email });

        if(user) {
            return NextResponse.json({ error: "User already exists" }, {status: 400});
        }

        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                savedUser
            },
            {
                status: 201
            });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
}