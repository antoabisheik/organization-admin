// _components/Sidebar.js
import React from 'react';
import {
  X,
  Home,
  Bell,
  Calendar,
  Users,
  UserCheck,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeItem, onItemClick, isCollapsed, onToggleCollapse }) => {
  const sidebarItems = [
    { id: 'my-gyms', icon: Home, label: 'My Gyms' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'attendance', icon: Calendar, label: 'Attendance' },
  ];

  const teamItems = [
    { id: 'head-coaches', icon: Users, label: 'Head Coaches' },
    { id: 'trainers', icon: UserCheck, label: 'Trainers' },
    { id: 'users', icon: User, label: 'Users' },
    { id: 'support', icon: HelpCircle, label: 'Support' }
  ];

  const handleItemClick = (itemId) => {
    onItemClick(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>

        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'space-x-2'}`}>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            {!isCollapsed && (
              <span className="text-gray-800 font-semibold truncate">Day of Organization</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:bg-gray-100 p-1 rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 relative">
          {/* Collapse Toggle Button - Desktop Only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex absolute -right-3 top-6 z-50 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors shadow-sm"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {!isCollapsed && (
            <h2 className="text-gray-500 text-xs uppercase tracking-wider font-medium mb-3">WorkSpace</h2>
          )}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg transition-colors text-left relative group ${
                  activeItem === item.id
                     ? 'bg-emerald-50 text-emerald-600 font-medium'
                     : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8">
            {!isCollapsed && (
              <h2 className="text-gray-500 text-xs uppercase tracking-wider font-medium mb-3">Teams</h2>
            )}
            <nav className="space-y-1">
              {teamItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg transition-colors text-left relative group ${
                    activeItem === item.id
                       ? 'bg-emerald-50 text-emerald-600 font-medium'
                       : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm">{item.label}</span>}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.label}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 text-gray-400 text-xs">
            2024 Appname v1
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;