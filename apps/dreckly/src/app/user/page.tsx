'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  Input,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '@/libs/feature/ui-kit';
import { AuthService, type User, type Address } from '@/libs/feature/auth';
import {
  UserIcon,
  MapPin,
  Settings,
  Package,
  Plus,
  Edit2,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'addresses' | 'orders' | 'preferences'
  >('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Mock user data for demo
      const mockUser: User = {
        id: 'user-1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+44 7700 900123',
        avatar: '/placeholder.svg?height=100&width=100',
        addresses: [
          {
            id: 'addr-1',
            label: 'Home',
            street: '123 High Street',
            city: 'Truro',
            postcode: 'TR1 2AB',
            county: 'Cornwall',
            isDefault: true,
            deliveryInstructions: 'Ring the doorbell twice',
          },
          {
            id: 'addr-2',
            label: 'Work',
            street: '45 Business Park',
            city: 'Truro',
            postcode: 'TR1 3CD',
            county: 'Cornwall',
            isDefault: false,
          },
        ],
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          dietary: ['vegetarian'],
          favoriteRestaurants: ['1', '3'],
        },
        createdAt: new Date('2023-01-15'),
        lastLogin: new Date(),
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = await AuthService.updateProfile(user.id, updates);
      setUser(updatedUser);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddAddress = async (address: Omit<Address, 'id'>) => {
    if (!user) return;

    try {
      const newAddress = await AuthService.addAddress(user.id, address);
      setUser((prev) =>
        prev ? { ...prev, addresses: [...prev.addresses, newAddress] } : null
      );
      setIsAddingAddress(false);
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!user) return;

    try {
      await AuthService.deleteAddress(user.id, addressId);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              addresses: prev.addresses.filter((addr) => addr.id !== addressId),
            }
          : null
      );
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <Link href="/login">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'preferences', label: 'Preferences', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={user.avatar || '/placeholder.svg'}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {user.createdAt.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h3>
                    {isEditingProfile ? (
                      <ProfileEditForm
                        user={user}
                        onSave={handleUpdateProfile}
                        onCancel={() => setIsEditingProfile(false)}
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.firstName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.lastName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {user.phone || 'Not provided'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Delivery Addresses
                    </h3>
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </button>
                  </div>

                  {isAddingAddress && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AddressForm
                          onSave={handleAddAddress}
                          onCancel={() => setIsAddingAddress(false)}
                        />
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid gap-4">
                    {user.addresses.map((address) => (
                      <Card key={address.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{address.label}</h4>
                                {address.isDefault && (
                                  <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {address.street}, {address.city},{' '}
                                {address.postcode}
                              </p>
                              {address.deliveryInstructions && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Instructions: {address.deliveryInstructions}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-md transition-colors">
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="border border-gray-300 bg-white hover:bg-gray-50 text-red-600 hover:text-red-700 p-2 rounded-md transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Order History</h3>
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      No orders yet
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Start ordering from your favorite restaurants!
                    </p>
                    <Link href="/">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
                        Browse Restaurants
                      </button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-600">
                            Receive order updates and promotions via email
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={user.preferences.notifications.email}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">
                            Receive order updates via SMS
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={user.preferences.notifications.sms}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-gray-600">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={user.preferences.notifications.push}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Dietary Preferences
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'vegetarian',
                        'vegan',
                        'gluten-free',
                        'dairy-free',
                        'nut-free',
                      ].map((dietary) => (
                        <label
                          key={dietary}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={user.preferences.dietary.includes(dietary)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                          <span className="text-sm capitalize">{dietary}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Edit Form Component
function ProfileEditForm({
  user,
  onSave,
  onCancel,
}: {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Address Form Component
function AddressForm({
  onSave,
  onCancel,
}: {
  onSave: (address: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    postcode: '',
    county: 'Cornwall',
    isDefault: false,
    deliveryInstructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Address Label"
        value={formData.label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
        placeholder="e.g., Home, Work"
        required
      />
      <Input
        label="Street Address"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        placeholder="123 High Street"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Truro"
          required
        />
        <Input
          label="Postcode"
          value={formData.postcode}
          onChange={(e) =>
            setFormData({ ...formData, postcode: e.target.value })
          }
          placeholder="TR1 2AB"
          required
        />
      </div>
      <Input
        label="County"
        value={formData.county}
        onChange={(e) => setFormData({ ...formData, county: e.target.value })}
        required
      />
      <Input
        label="Delivery Instructions (Optional)"
        value={formData.deliveryInstructions}
        onChange={(e) =>
          setFormData({ ...formData, deliveryInstructions: e.target.value })
        }
        placeholder="Ring the doorbell twice"
      />
      <div className="flex items-center space-x-2">
        <input
          id="isDefault"
          type="checkbox"
          checked={formData.isDefault}
          onChange={(e) =>
            setFormData({ ...formData, isDefault: e.target.checked })
          }
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="text-sm">
          Set as default address
        </label>
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Save Address
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
