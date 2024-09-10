'use client'

import { useSelector } from 'react-redux'
import { useGetUserProfileQuery } from '@/@core/infra/api/userApi'
import { useGetLinksQuery } from '@/@core/infra/api/linksApi'
import { selectLinks } from '@/lib/store/slices/linksSlice'
import { PhoneMockup } from '@/components/PhoneMockup'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import LinkList from './users/LinkList'

export default function MobilePreview() {
    const { isLoading: isLinksLoading } = useGetLinksQuery();
    const { data: userProfile, isLoading: isProfileLoading } = useGetUserProfileQuery();

    const links = useSelector(selectLinks)

    const visibleLinks = links.filter(link => !link.archived && link.visible)

    return (
        <aside className="w-96 bg-background p-4">
            <PhoneMockup>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {isProfileLoading || isLinksLoading ? (
                        <>
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <Skeleton className="h-6 w-32" />
                            <div className="w-full space-y-2">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <Image
                                src={userProfile?.image || '/avatar.png'}
                                alt="User Avatar"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <h2 className="text-lg font-semibold">@{userProfile?.username}</h2>
                            <div className="w-full space-y-2">
                                <LinkList links={visibleLinks || []} />
                            </div>
                        </>
                    )}
                </div>
            </PhoneMockup>
        </aside>
    )
}