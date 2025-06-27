import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg p-12 shadow-sm">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any delicious food to your cart
              yet.
            </p>
            <Link href="/" className="inline-block">
              <span className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors text-lg cursor-pointer">
                Start Ordering
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
