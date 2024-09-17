"use client"
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = useState({
    email: "",
    password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);

            console.log("Login Success", response.data);
            router.push("/profile");
            
        
       } catch (error:any) {
            console.log("Login Failed", error.meesage);
        
       }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2md mb-5">
                Login
            </h1>
            <hr />
            <label className="m-2" htmlFor="email">Email</label>
            <input
                className="border rounded-md border-gray-300 text-black p-2"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label className="m-2" htmlFor="password">Password</label>
            <input
                className="border rounded-md border-gray-300 text-black p-2"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                className="bg-blue-500 text-white px-5 py-2 rounded-md m-5"
                onClick={onLogin}
            >
                Login
            </button>

            <Link href="/signup">
                    Don't have an account? Signup here
            </Link>
        </div>
    );
}