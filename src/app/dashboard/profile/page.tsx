"use client";

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/@core/infra/api/userApi'
import EditableInput from '@/components/dashboard/EditableInput';

export default function Profile() {
    const { data: userProfile, isLoading } = useGetUserProfileQuery();
    const [updateUserProfile] = useUpdateUserProfileMutation();

    if (isLoading) return <div className="flex justify-center items-center h-full"><p>Loading...</p></div>

    const handleSaveName = (name: string) => {
        updateUserProfile({ name })
    }

    const handleSaveUsername = (username: string) => {
        updateUserProfile({ username })
    }

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="w-full max-w-md">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-12 text-center">Profile</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-24 h-24 rounded-full overflow-hidden">
                            <AvatarImage
                                className="w-full h-full object-cover"
                                src={userProfile?.image}
                                alt="Profile picture"
                            />
                            <AvatarFallback className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-xl font-semibold">
                                {userProfile?.email[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="mt-6 space-y-4">
                        <div>
                            <Label>Name</Label>
                            <EditableInput
                                initialValue={userProfile?.name || ''}
                                onSave={handleSaveName}
                            />
                        </div>
                        <div>
                            <Label>Username</Label>
                            <EditableInput
                                initialValue={userProfile?.username || ''}
                                onSave={handleSaveUsername}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}