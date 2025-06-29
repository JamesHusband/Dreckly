import * as React from 'react';
import type { Cuisine } from './base-types';

// =====================
// Modal & Dialog Props
// =====================
export interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

// =====================
// Navigation Props
// =====================
export interface NavButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showText?: boolean;
  text?: string;
}

export interface DropdownMenuItem {
  href: string;
  label: string;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownMenuItem[];
  onItemClick?: () => void;
  className?: string;
}

// =====================
// Button Props
// =====================
export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  'aria-label': string;
  disabled?: boolean;
}

// =====================
// Display Props
// =====================
export interface LogoProps {
  textColor?: 'grey' | 'white';
}

export interface CuisineCardProps extends Cuisine {
  iconComponent: React.ElementType;
  onClick?: () => void;
  isSelected?: boolean;
}
