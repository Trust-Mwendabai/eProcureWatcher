import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Home, Search, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Verification', href: '/verification', icon: Search },
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', href: '/admin', icon: Settings }] : []),
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">e-ProcureWatch</h1>
              <p className="text-xs text-gray-500">Zambia Revenue Authority</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{user?.name}</span>
              <span className="text-xs text-gray-500 capitalize">({user?.role?.replace('_', ' ')})</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
