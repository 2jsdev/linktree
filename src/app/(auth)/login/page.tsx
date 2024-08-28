"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export default function Login() {
    const searchParams = useSearchParams();
    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        const state = searchParams.get("state");
        setIsSignup(state === "signup");
    }, [searchParams]);

    return (
        <div className="flex min-h-screen">
            <div className="flex w-full lg:w-1/2 flex-col">
                {/* Navbar */}
                <div className="flex items-center justify-between p-4 lg:p-6">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Linktree
                    </Link>
                </div>

                {/* Form Section */}
                <div className="flex flex-grow items-center justify-center p-8 lg:p-12">
                    <AuthForm isSignup={isSignup} />
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2">
                <div className="relative w-full h-full">
                    <Image
                        alt="Cover image"
                        src={isSignup ? "/images/signup-cover.jpg" : "/images/login-cover.jpg"}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
            </div>
        </div>
    );
}
