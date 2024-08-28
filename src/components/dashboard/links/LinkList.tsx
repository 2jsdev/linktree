"use client";

import { useState } from 'react';
import { Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import DraggableLinkList from './DraggableLinkList';
import ArchivedLinkCard from './ArchivedLinkCard';
import { useGetLinksQuery } from '@/@core/infra/api/linksApi';
import { useSelector } from 'react-redux';
import { selectArchivedLinks, selectLinks } from '@/lib/store/slices/linksSlice';

const LinkList = () => {
    const { isLoading } = useGetLinksQuery();
    const [viewArchived, setViewArchived] = useState(false);

    const links = useSelector(selectLinks);
    const archivedLinks = useSelector(selectArchivedLinks);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            {viewArchived ? (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => setViewArchived(false)}
                            className="flex items-center space-x-2"
                        >
                            <ChevronLeft className="w-6 h-6" />
                            <span>Back</span>
                        </button>
                        <h2 className="text-center flex-1">Archived Links</h2>
                        <div className="w-20"></div>
                    </div>
                    <div className="space-y-4">
                        {archivedLinks.map((link) => (
                            <ArchivedLinkCard key={link.id} id={link.id} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-20"></div>
                        <h2 className="text-center flex-1"></h2>
                        <button
                            onClick={() => setViewArchived(true)}
                            className="self-end flex items-center justify-center space-x-2"
                        >
                            <Archive className="w-6 h-6" />
                            <span>View Archived</span>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <DraggableLinkList links={links} />
                </div>
            )}
        </div>
    );
};

export default LinkList;
