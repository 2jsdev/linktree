"use client";

import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '@/@core/infra/api/userApi';
import { selectLinks } from '@/lib/store/slices/linksSlice';
import { PhoneMockup } from '@/components/PhoneMockup';
import Image from 'next/image';

const MobilePreview = () => {
    const { data: userProfile } = useGetUserProfileQuery();
    const links = useSelector(selectLinks);

    const visibleLinks = links.filter(link => !link.archived && link.visible);

    return (
        <aside className="w-96 bg-background p-4">
            <PhoneMockup>
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* User Avatar */}
                    <Image
                        src={userProfile?.image || '/avatar.png'}
                        alt="User Avatar"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    {/* Username */}
                    <h2 className="text-lg font-semibold">@{userProfile?.username}</h2>

                    {/* List of visible links */}
                    <div className="w-full space-y-2">
                        {visibleLinks?.map(link => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full p-2 text-center text-white bg-gray-800 rounded-lg"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </PhoneMockup>
        </aside>
    );
};

export default MobilePreview;
