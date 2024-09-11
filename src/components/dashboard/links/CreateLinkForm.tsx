'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCreateLinkMutation } from '@/@core/infra/api/linksApi';
import { selectLinks } from '@/lib/store/slices/linksSlice';
import { X } from 'lucide-react';

interface CreateLinkFormProps {
  onClose: () => void;
}

const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onClose }) => {
  const [createLink] = useCreateLinkMutation();

  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  const links = useSelector(selectLinks);
  const order = links.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createLink({
      label,
      url,
      visible: false,
      archived: false,
      order,
    });
    onClose();
  };

  return (
    <Card className="mb-6 w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Add link</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium">
              Label
            </Label>
            <Input
              id="label"
              placeholder="Enter label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="w-[48%]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-[48%] bg-purple-600 text-white hover:bg-purple-700"
            >
              + Add link
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
