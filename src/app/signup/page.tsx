"use client"
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { sign } from "crypto";
import toast from "react-hot-toast";

export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);

            router.push("/login");
            
            console.log("Signup Success",response.data);
        } catch (error:any) {
            console.log("Signup Failed", error.meesage);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2md mb-5">
                Signup
            </h1>
            <hr />
            <label className="m-2" htmlFor="username">Username</label>
            <input
                className="border rounded-md border-gray-300 text-black p-2"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
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
                id="signup"
                className="bg-blue-500 text-white px-5 py-2 rounded-md m-5"
                onClick={onSignup}
                disabled={buttonDisabled}
            >
                Signup
            </button>

            <Link href="/login">
                    Already have an account? Login here
            </Link>
        </div>
    );
}