'use client';

import { User, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  passwordHash: string;
  favouriteRestaurants?: string[];
  orderHistory?: string[];
  createdAt: string;
}

const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // For now, we'll fetch the first user (ID: 1) - in a real app this would be the logged-in user
        const response = await fetch('/api/users/1');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-red-600">Error loading user data: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
    });
  };

  const formatAddress = (address: Address) => {
    const parts = [address.line1];
    if (address.line2) parts.push(address.line2);
    parts.push(address.city, address.postcode);
    return parts.join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Profile Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{formatAddress(user.address)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {user.orderHistory && user.orderHistory.length > 0 ? (
                user.orderHistory.map((orderId, index) => (
                  <div
                    key={orderId}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          Order #{orderId}
                        </p>
                        <p className="text-sm text-gray-600">Order details</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">£--.--</p>
                        <p className="text-sm text-green-600">Delivered</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Delivered on {formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Settings
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-600">
                  Update your personal information
                </p>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-600">Update your password</p>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Delivery Addresses</p>
                <p className="text-sm text-gray-600">
                  Manage your delivery addresses
                </p>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                <p className="font-medium text-red-600">Sign Out</p>
                <p className="text-sm text-red-500">Sign out of your account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
