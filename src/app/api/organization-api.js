// app/api/organization-api.js (Updated for Admin)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class OrganizationAPI {
  /**
   * Get complete organization data for logged-in admin
   */
  async getCompleteData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/organizations/complete-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch organization data');
      }

      const data = await response.json(); 
      return data; // Returns { organization, gyms, coaches, users, trainers }
    } catch (error) {
      console.error('Error fetching complete organization data:', error);
      throw error;
    }
  }

  /**
   * Get admin's organization
   */
  async getMyOrganization() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/organizations/my-organization`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch organization');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  }

  /**
   * Get all gyms for admin's organization
   */
  async getGyms() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/gyms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch gyms');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching gyms:', error);
      throw error;
    }
  }

  /**
   * Get all coaches for admin's organization
   */
  async getCoaches() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/coaches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch coaches');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching coaches:', error);
      throw error;
    }
  }

  /**
   * Get all users for admin's organization
   */
  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Get all trainers for admin's organization
   */
  async getTrainers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/trainers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch trainers');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching trainers:', error);
      throw error;
    }
  }
}

export default new OrganizationAPI();