"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';
import organizationAPI from '../api/organization-api'; // Import API client

// Component imports
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import MyGyms from '../_components/Mygym';
import SupportTicketSystem from '../_components/SupportTicketSystem';
import Notifications from '../_components/Notifications';
import Attendance from '../_components/Attendance';
import HeadCoaches from '../_components/HeadCoaches';
import Trainers from '../_components/Trainers';
import Users from '../_components/Users';

const MainLayout = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState('my-gyms');
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  // User and Organization State
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);

  // Data State
  const [gyms, setGyms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  // Auth State Listener - Now uses backend middleware
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      
      if (firebaseUser) {
        try {
          console.log("User authenticated, fetching organization data...");
          
          // Call backend middleware instead of direct Firebase
          const data = await organizationAPI.getCompleteData();
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });
          
          setOrganization(data.organization);
          setGyms(data.gyms || []);
          setCoaches(data.coaches || []);
          setUsers(data.users || []);
          setTrainers(data.trainers || []);
          
          console.log("Organization data loaded successfully");
          
        } catch (error) {
          console.error('Error loading organization data:', error);
          
          // If backend fails, show error but don't crash
          setOrganization(null);
          setGyms([]);
          setCoaches([]);
          setUsers([]);
          setTrainers([]);
        }
      } else {
        console.log("No user authenticated");
        setUser(null);
        setOrganization(null);
        setGyms([]);
        setCoaches([]);
        setUsers([]);
        setTrainers([]);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Event Handlers
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleItemClick = (itemId) => setActiveComponent(itemId);
  const handleNotificationClick = () => setActiveComponent('notifications');

  // Gym Handlers
  const handleViewGym = (gym) => router.push(`/gym-details/${gym.id}`);
  const handleEditGym = (gym) => alert(`Edit ${gym.name} - Coming soon!`);
  const handleAddGym = () => alert('Add gym - Coming soon!');
  const handleAssignCoach = (gym) => router.push(`/gym-details/${gym.id}`);

  // Coach Handlers
  const handleEditCoach = (coach) => alert(`Edit ${coach.name} - Coming soon!`);
  const handleAddPerson = () => alert('Add person - Coming soon!');
  const handleUpdateStatus = () => alert('Update status - Coming soon!');
  const handleDeleteCoach = (coach) => {
    if (window.confirm(`Delete ${coach.name}?`)) {
      alert('Delete - Coming soon!');
    }
  };

  // Component Rendering
  const renderActiveComponent = () => {
    const componentProps = {
      gyms,
      coaches,
      users,
      trainers,
      organization,
      isLoading: dataLoading,
      organizationId: organization?.id,
      // Gym handlers
      onAssignCoach: handleAssignCoach,
      onEditGym: handleEditGym,
      onViewGym: handleViewGym,
      onAddGym: handleAddGym,
      // Coach handlers
      onEditCoach: handleEditCoach,
      onAddPerson: handleAddPerson,
      onUpdateStatus: handleUpdateStatus,
      onDeleteCoach: handleDeleteCoach
    };

    switch (activeComponent) {
      case 'my-gyms':
        return <MyGyms {...componentProps} />;
      case 'notifications':
        return <Notifications {...componentProps} />;
      case 'attendance':
        return <Attendance {...componentProps} />;
      case 'head-coaches':
        return <HeadCoaches {...componentProps} />;
      case 'trainers':
        return <Trainers {...componentProps} />;
      case 'users':
        return <Users {...componentProps} />;
      case 'support':
        return <SupportTicketSystem organizationId={organization?.id} />;
      default:
        return <MyGyms {...componentProps} />;
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-emerald-500 mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your organization...</p>
        </div>
      </div>
    );
  }

  // Access denied screen
  if (!user || !organization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            {!user
              ? "Please login to continue."
              : "No organization found for your account."}
          </p>
          {!user && (
            <button
              onClick={() => router.push('/signin')}
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition font-medium"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeComponent}
        onItemClick={handleItemClick}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header
          onMenuClick={handleSidebarToggle}
          user={{
            name: user.displayName || user.email,
            email: user.email
          }}
          onNotificationClick={handleNotificationClick}
          notificationCount={3}
        />

        {/* Organization Info Bar */}
        {organization && (
          <div className="bg-emerald-50 border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {organization.avatar || organization.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {organization.name}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({organization.role || 'Admin'})
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 ml-4">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                    {gyms.length} {gyms.length === 1 ? 'Gym' : 'Gyms'}
                  </span>
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                    {organization.city}, {organization.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
