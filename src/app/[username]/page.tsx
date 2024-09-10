'use client'

import React from 'react'
import { useGetPublicProfileByUsernameQuery } from '@/@core/infra/api/userApi'
import UserNotFound from '@/components/dashboard/users/UserNotFound'
import UserInfo from '@/components/dashboard/users/UserInfo'
import LinkList from '@/components/dashboard/users/LinkList'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserPublicProfilePage({ params }: { params: { username: string } }) {
    const { data: userProfile, isLoading } = useGetPublicProfileByUsernameQuery(params.username)

    if (isLoading) {
        return (
            <div className="w-full max-w-md mx-auto pt-12 px-4 space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        )
    }

    if (!userProfile) return <UserNotFound />

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto pt-12 px-4">
            <UserInfo userProfile={userProfile} />
            <LinkList links={userProfile.links || []} />
        </div>
    )
}
