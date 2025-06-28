'use client';

import { useState, useCallback } from 'react';
import { Restaurant, PendingAction } from '@dreckly/types';

export const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null
  );

  const showConfirmation = useCallback(
    (itemId: string, restaurant: Restaurant) => {
      setPendingAction({ itemId, restaurant });
      setIsOpen(true);
    },
    []
  );

  const hideConfirmation = useCallback(() => {
    setIsOpen(false);
    setPendingAction(null);
  }, []);

  const confirmAction = useCallback(() => {
    if (pendingAction) {
      return pendingAction;
    }
    return null;
  }, [pendingAction]);

  return {
    isOpen,
    showConfirmation,
    hideConfirmation,
    confirmAction,
    pendingAction,
  };
};
