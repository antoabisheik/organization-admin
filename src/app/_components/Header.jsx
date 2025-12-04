import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header = ({
  onMenuClick,
  user = { name: 'David Billy', email: 'davidbilly@gmail.com' },
  notificationCount = 3,
  onNotificationClick
}) => {

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <div className="text-left">
            <p className="text-xs text-gray-500">powered by</p>
            <p className="font-semibold text-emerald-600">Smartan Fittech</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">

          {/* Notifications */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <Bell size={22} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-medium">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;