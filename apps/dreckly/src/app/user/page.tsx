import { User, Mail, Phone, MapPin, Clock } from 'lucide-react';

const UserPage = () => {
  // Mock user data - this will be replaced with real user data when auth is implemented
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 123 456 7890',
    address: '123 High Street, Truro, Cornwall TR1 2AB',
    memberSince: 'January 2024',
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
                  {user.name}
                </h1>
                <p className="text-gray-600">Member since {user.memberSince}</p>
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
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{user.address}</p>
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
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      The Cornish Pasty Co.
                    </p>
                    <p className="text-sm text-gray-600">Order #12345</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">£24.50</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Delivered on March 15, 2024</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      Fisherman&apos;s Catch
                    </p>
                    <p className="text-sm text-gray-600">Order #12344</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">£18.99</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Delivered on March 12, 2024</span>
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
