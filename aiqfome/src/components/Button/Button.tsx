'use client';
import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  fullWidth = false,
  variant = 'primary',
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded text-white font-semibold py-3 px-4 text-sm transition',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-purple-700 hover:bg-purple-800',
        variant === 'secondary' && 'bg-gray-300 text-gray-800 hover:bg-gray-400',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}