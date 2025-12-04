// app/api/organization-api.js (Updated for Admin)

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class OrganizationAPI {
  /**
   * Get complete organization data for logged-in admin
   */
  async getCompleteData() {
    try {
      console.log('Fetching organization data from:', `${API_BASE_URL}/admin/organizations/complete-data`);
      console.log('Cookies being sent:', document.cookie);

      const response = await fetch(`${API_BASE_URL}/admin/organizations/complete-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Organization API response status:', response.status);
      console.log('Organization API response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Organization API error:', errorData);
        throw new Error(errorData.error || 'Unauthorized - No valid authentication found');
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
      const response = await fetch(`${API_BASE_URL}/admin/organizations/my-organization`, {
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
      const response = await fetch(`${API_BASE_URL}/admin/gyms`, {
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
      const response = await fetch(`${API_BASE_URL}/admin/coaches`, {
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
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
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
      const response = await fetch(`${API_BASE_URL}/admin/trainers`, {
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