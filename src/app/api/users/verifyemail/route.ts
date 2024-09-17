import { connect } from '@/app/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/userModel'

connect()

export async function POST(Request: NextRequest) { 
    try {
        const reqBody = await Request.json()
        const { token } = reqBody

        const user = await User.findOne({ VerifyToken: token })
        
        if(!user) {
            return NextResponse.json({error: "Token is invalid or has expired"}, {status: 400})
        }

        user.isVerified = true
        user.VerifyToken = undefined
        user.VerifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200})

        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}