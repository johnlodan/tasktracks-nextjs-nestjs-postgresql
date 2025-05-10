import { useLoginMutation } from "@/services/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import Link from 'next/link';
import Button from "../shared/button";

const LoginComponent = () => {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456");
    const [login, { isLoading }] = useLoginMutation();
    const [error, setError] = useState("");
    const router = useRouter()

    async function handleLogin() {
        try {
            const response = await login({ email, password }).unwrap();
            if (response.token) {
                Cookies.set('userToken', response.token, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
                Cookies.set('userData', JSON.stringify(response.user), { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
                router.push("/boards").then(() => router.reload());
            }
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid email or password. Please try again.");
        }
    }

    return (
        <div
            className="flex h-screen bg-cover bg-center items-center justify-center p-6"
            style={{
                backgroundImage:
                    "url('https://c0.wallpaperflare.com/path/389/615/630/business-businessman-communication-concept-018abae74a916fe5c25568f413e2f536.jpg')",
            }}
        >
            <div className="flex w-full max-w-4xl bg-gray-900 bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
                <div className="hidden md:flex flex-col justify-center items-start w-1/2 p-6">
                    <h1 className="text-4xl font-extrabold text-white mb-4">TaskTracks</h1>
                    <p className="text-white text-left text-md leading-relaxed">
                        Streamline Your Workflow, Elevate Your Productivity.
                        From idea to execution, organize, track, and optimize your tasks with seamless ticket management and staging.
                        Whether you&lsquo;re collaborating with teams or managing projects solo, TaskTracks keeps everything in sync, structured, and effortless.
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded w-full mb-4 bg-gray-800 text-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded w-full mb-4 bg-gray-800 text-white"
                    />
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {error}
                        </p>
                    )}
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        className="bg-gray-500 px-4 py-2 rounded w-full text-white font-bold hover:bg-gray-600 transition"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <p className="text-gray-400 text-center mt-4 text-sm">
                        Don&lsquo;t have an account?
                        <Link href="/register">
                            <span className="text-blue-500 cursor-pointer">Sign up</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
