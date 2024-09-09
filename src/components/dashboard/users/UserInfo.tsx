import Image from "next/image";

export default function UserInfo({ userProfile }: { userProfile: any }) {
    return (
        <div className="flex flex-col items-center space-y-4 mb-8">
            <Image
                src={userProfile.image || '/avatar.png'}
                alt={userProfile.name || 'User Avatar'}
                width={100}
                height={100}
                className="rounded-full"
            />
            <h2 className="text-2xl font-semibold">@{userProfile.username}</h2>
        </div>
    )
}