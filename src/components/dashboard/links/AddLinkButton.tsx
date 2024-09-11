'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateLinkForm from './CreateLinkForm';

const AddLinkButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      {!isFormOpen ? (
        <Button
          className="mb-6 w-full bg-purple-600 text-white hover:bg-purple-700"
          onClick={openForm}
        >
          + Add link
        </Button>
      ) : (
        <CreateLinkForm onClose={closeForm} />
      )}
    </>
  );
};

export default AddLinkButton;
