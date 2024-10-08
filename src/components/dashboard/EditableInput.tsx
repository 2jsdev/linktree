'use client';

import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

interface EditableInputProps {
  initialValue: string;
  onSave: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({
  initialValue,
  onSave,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onSave(value);
  };

  return (
    <div className="relative flex items-center w-full">
      {isEditing ? (
        <input
          className="w-full border-none focus:ring-0 focus:outline-none bg-background text-sm md:text-base lg:text-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          autoFocus
          style={{ paddingRight: '2rem' }}
        />
      ) : (
        <div className="flex items-center">
          <span
            className="truncate flex-grow text-sm md:text-base lg:text-lg"
            style={{ maxWidth: '100%' }}
          >
            {value}
          </span>
          <Pencil
            className="ml-3 h-4 w-4 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
};

export default EditableInput;
