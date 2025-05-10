import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRegisterMutation } from "@/services/auth";
import Button from "../shared/button";

const RegisterComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, { isLoading }] = useRegisterMutation();
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleRegister() {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Basic required field validation
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            setError("Name, email, and password are required.");
            return;
        }

        // Simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setError("");
            const response = await register({ name: trimmedName, email: trimmedEmail, password: trimmedPassword }).unwrap();
            if (response.token) {
                Cookies.set('userToken', response.token, { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
                Cookies.set('userData', JSON.stringify(response.user), { expires: 7, path: '/', secure: true, sameSite: 'Strict' });
                router.reload();
            }
        } catch (err: any) {
            if (err?.status === 409 && err?.data?.message) {
                setError(err.data.message);
            } else if (err?.data?.message) {
                setError(err.data.message);
            } else {
                setError("Registration failed. Please check your inputs and try again.");
            }
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
                        Join the revolution in productivity. Sign up now and start organizing your tasks, projects, and goals with ease.
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full mb-4 bg-gray-800 text-white"
                    />
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
                    <Button loading={isLoading} disabled={isLoading}
                        className="bg-gray-500 px-4 py-2 rounded w-full text-white font-bold hover:bg-gray-600 transition"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <p className="text-gray-400 text-center mt-4 text-sm">
                        Already have an account?{" "}
                        <Link href="/login">
                            <span className="text-blue-500 cursor-pointer">Log in</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
