'use client';

import { clearCartStorage } from '@dreckly/state';

export default function DebugPage() {
  const handleClearCart = () => {
    clearCartStorage();
    alert('Cart storage cleared! Please refresh the page.');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      <button
        onClick={handleClearCart}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Cart Storage
      </button>
    </div>
  );
}
