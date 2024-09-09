'use client'

import React from 'react'
import { useGetPublicProfileByUsernameQuery } from '@/@core/infra/api/userApi'
import UserNotFound from '@/components/dashboard/users/UserNotFound'
import UserInfo from '@/components/dashboard/users/UserInfo'
import LinkList from '@/components/dashboard/users/LinkList'
import SkeletonLoader from '@/components/dashboard/users/SkeletonLoader'

export default function UserProfilePage({ params }: { params: { username: string } }) {
    const { data: userProfile, isLoading } = useGetPublicProfileByUsernameQuery(params.username)

    if (isLoading) return <SkeletonLoader />
    if (!userProfile) return <UserNotFound />

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto pt-12 px-4">
            <UserInfo userProfile={userProfile} />
            <LinkList links={userProfile.links || []} />
        </div>
    )
}
