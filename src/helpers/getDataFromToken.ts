import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || "";
        const data:any = Jwt.verify(token, process.env.TOKEN_SECRET!);
        return data.id;
    } catch (error:any) {
        throw new Error(error.message);

    }
}