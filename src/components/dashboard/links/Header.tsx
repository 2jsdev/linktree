"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import { Clipboard } from "lucide-react"
import { useGetUserProfileQuery } from '@/@core/infra/api/userApi';
import Link from 'next/link';

const Header = () => {
    const { data } = useGetUserProfileQuery();

    return (
        <header className="mb-6 flex items-center justify-between">
            {
                data?.username ? (
                    <>
                        <h1 className="text-2xl font-bold">Your Linktree is live: linktree/{data?.username}</h1>
                        <Button variant="outline">
                            <Clipboard className="mr-2 h-4 w-4" />
                            Copy your Linktree URL
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold">Your Linktree is not live yet</h1>
                        <Link href="/dashboard/profile">
                            <Button variant="outline">Set up your Linktree</Button>
                        </Link>
                    </>
                )


            }
        </header>
    )
}

export default Header
