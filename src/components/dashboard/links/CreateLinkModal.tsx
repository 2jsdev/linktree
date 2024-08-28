"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useCreateLinkMutation } from '@/@core/infra/api/linksApi';
import { selectLinks } from '@/lib/store/slices/linksSlice';

const CreateLinkModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [createLink] = useCreateLinkMutation();

    const [label, setLabel] = useState('');
    const [url, setUrl] = useState('');
    const [visible, setVisible] = useState(false);

    const links = useSelector(selectLinks);
    const order = links.length;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createLink({
            label,
            url,
            visible,
            archived: false,
            order
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Link</DialogTitle>
                    <DialogClose />
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Label className="block text-sm font-medium text-gray-700">Label</Label>
                        <Input
                            placeholder="Enter label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                        <Label className="block text-sm font-medium text-gray-700">URL</Label>
                        <Input
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                        <div className="flex items-center">
                            <label className="mr-2">Visible:</label>
                            <Switch checked={visible} onCheckedChange={(checked) => setVisible(checked)} />
                        </div>
                        <Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700">
                            Create Link
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLinkModal;
