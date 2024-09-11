'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Trash,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Music,
  Youtube,
  Archive,
  X,
  GripVertical,
} from 'lucide-react';
import EditableInput from '../EditableInput';
import {
  useArchiveLinkMutation,
  useDeleteLinkMutation,
  useUpdateLinkMutation,
} from '@/@core/infra/api/linksApi';
import { selectLinkById } from '@/lib/store/slices/linksSlice';
import { RootState } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkCardProps {
  id: string;
  isDragging: boolean;
}

export default function LinkCard({ id, isDragging }: LinkCardProps) {
  const [updateLink] = useUpdateLinkMutation();
  const [deleteLink] = useDeleteLinkMutation();
  const [archiveLink] = useArchiveLinkMutation();

  const link = useSelector((state: RootState) => selectLinkById(state)(id));

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isDragging && showConfirmation) {
      setShowConfirmation(false);
    }
  }, [isDragging, showConfirmation]);

  if (!link) return null;

  const handleSaveLabel = (label: string) => {
    updateLink({
      id,
      updatedLink: { label },
    });
  };

  const handleSaveUrl = (newUrl: string) => {
    updateLink({
      id,
      updatedLink: { url: newUrl },
    });
  };

  const handleCheck = (checked: boolean) => {
    updateLink({
      id,
      updatedLink: { visible: checked },
    });
  };

  const handleDelete = () => {
    deleteLink(id);
    setShowConfirmation(false);
  };

  const handleArchive = () => {
    archiveLink(id);
    setShowConfirmation(false);
  };

  const getIcon = (label: string) => {
    switch (label) {
      case 'Website':
        return <LinkIcon className="h-5 w-5" />;
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      case 'WhatsApp':
        return <MessageCircle className="h-5 w-5" />;
      case 'TikTok':
        return <Music className="h-5 w-5" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-background">
      <CardContent className="flex flex-col p-2 sm:p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-grow">
            <GripVertical
              className="h-4 w-4 text-gray-400 cursor-move"
              aria-label="Drag to reorder"
            />
            <div className="rounded-full p-1 sm:p-2">{getIcon(link.label)}</div>
            <div className="space-y-1 flex-grow">
              <EditableInput
                initialValue={link.label}
                onSave={handleSaveLabel}
              />
              <EditableInput initialValue={link.url} onSave={handleSaveUrl} />
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmation(!showConfirmation)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Switch checked={link.visible} onCheckedChange={handleCheck} />
          </div>
        </div>

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="mt-4 w-full"
            >
              <div className="flex justify-between items-center pt-5 pb-2 w-full border-t-2">
                <span className="text-sm font-medium w-full text-center">
                  Delete
                </span>
                <div
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmation(false)}
                >
                  <X className="h-5 w-5" />
                </div>
              </div>

              <div className="flex justify-between items-center space-x-2 sm:space-x-4 mt-2">
                <div className="flex flex-col items-center w-1/3 p-2 md:p-4 rounded-lg">
                  <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="flex items-center justify-center space-x-2 w-full"
                  >
                    <Trash className="h-5 w-5" />
                    <span>Delete</span>
                  </Button>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    Delete forever.
                  </span>
                </div>

                <div className="flex flex-col items-center w-2/3 p-2 md:p-4 rounded-lg">
                  <Button
                    onClick={handleArchive}
                    className="flex items-center justify-center space-x-2 w-full bg-purple-600 text-white hover:bg-purple-700 py-2 rounded-lg"
                  >
                    <Archive className="h-5 w-5" />
                    <span>Archive</span>
                  </Button>
                  <span className="text-xs text-gray-600 mt-2 text-center">
                    Reduce clutter, keep your analytics and restore anytime.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
