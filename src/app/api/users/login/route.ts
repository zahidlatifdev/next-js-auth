import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({ error: "Please provide all fields" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validPassword = await bycryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email,
        }
        
        const token = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        const respnse = NextResponse.json({
            message: "Login successful",
            success: true,
        }, {
            status: 200
        });

        respnse.cookies.set("token", token, {
            httpOnly: true,
        });

        return respnse;
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500});
        
    }
}