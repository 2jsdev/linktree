'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateLinkModal from './CreateLinkModal';

const AddLinkButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        className="mb-6 w-full bg-purple-600 text-white hover:bg-purple-700"
        onClick={openModal}
      >
        + Add link
      </Button>
      <CreateLinkModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default AddLinkButton;
