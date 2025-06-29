'use client';

import { User, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserOrders } from '@dreckly/orders';
import { User as UserType, Address } from '@dreckly/types';
import { formatDate, formatAddress } from '@dreckly/utils';

const UserPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        // For now, we'll fetch the first user (ID: 1) - in a real app this would be the logged-in user
        const response = await fetch('/api/users/1');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);

        // Fetch orders immediately after user is loaded
        if (userData.id) {
          const ordersData = await getUserOrders(userData.id);
          setOrders(ordersData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar: Profile & Account Settings */}
          <aside className="md:w-1/3 w-full flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
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
                    <p className="text-gray-900">
                      {formatAddress(user.address)}
                    </p>
                  </div>
                </div>
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
                  <p className="font-medium text-gray-900">
                    Delivery Addresses
                  </p>
                  <p className="text-sm text-gray-600">
                    Manage your delivery addresses
                  </p>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                  <p className="font-medium text-red-600">Sign Out</p>
                  <p className="text-sm text-red-500">
                    Sign out of your account
                  </p>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content: Order History */}
          <main className="md:w-2/3 w-full flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order History
              </h2>
              <div className="space-y-4">
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.restaurantName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items.reduce(
                              (sum: number, item: any) => sum + item.quantity,
                              0
                            )}{' '}
                            item{order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            £{order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1).replace(/_/g, ' ')}
                          </p>
                        </div>
                      </div>
                      {/* Itemized order summary */}
                      <ul className="mb-2 text-sm text-gray-700">
                        {order.items.map((item: any) => (
                          <li
                            key={item.id}
                            className="flex justify-between items-center py-0.5"
                          >
                            <span>
                              {item.quantity} × {item.name}
                            </span>
                            <span>
                              £{item.price.toFixed(2)}
                              {item.quantity > 1 && (
                                <span className="ml-1 text-xs text-gray-500">
                                  (£{(item.price * item.quantity).toFixed(2)})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {order.status === 'delivered' &&
                          order.actualDeliveryTime
                            ? `Delivered on ${formatDate(
                                order.actualDeliveryTime
                              )}`
                            : order.status === 'out_for_delivery'
                            ? `Out for delivery (est. ${formatDate(
                                order.estimatedDeliveryTime
                              )})`
                            : order.status === 'preparing'
                            ? `Preparing (est. ${formatDate(
                                order.estimatedDeliveryTime
                              )})`
                            : order.status === 'confirmed'
                            ? `Confirmed (est. ${formatDate(
                                order.estimatedDeliveryTime
                              )})`
                            : `Ordered on ${formatDate(order.orderDate)}`}
                        </span>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
