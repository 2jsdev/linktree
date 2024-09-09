import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
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