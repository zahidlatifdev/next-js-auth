"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfilePage() {

    const router = useRouter();
    const [user, setUser] = useState<any>("");
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("Logout Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Logout Failed", error.message);
            
        }
    }

    const getUserData = async () => {
        try {
            const response = await axios.get("/api/users/me");
            setUser(response.data.data);
        } catch (error: any) {
            console.log("User Data Failed", error.message);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);
    
        return(
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-7xl mb-5">
                    Profile
                </h1>
                <h2 className="text-5xl mb-5">
                    Username: {user.username ? <Link href={`/profile/${user._id}`}>{user.username}</Link> : "Loading..."}
                </h2>
                <hr />
                <p className="text-4xl">Profile Page</p>
                <hr />
                <button
                onClick={logout}
                className="bg-blue-500 text-white px-5 py-2 rounded-md m-5"
            >
                Logout
            </button>
            </div>
   )
}