import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="text-sm">
            <p className="font-medium text-gray-900 truncate max-w-24">{user?.name}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;