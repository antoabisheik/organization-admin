// app/api/user-management-api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class UserManagementAPI {
  /**
   * Get all users across all gyms in the organization
   */
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/all`, {
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

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  /**
   * Transfer users between gyms
   */
  async transferUsers(userIds, targetGymId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userIds, targetGymId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to transfer users');
      }

      return await response.json();
    } catch (error) {
      console.error('Error transferring users:', error);
      throw error;
    }
  }

  /**
   * Get user statistics
   */
  async getStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/statistics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch statistics');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

  /**
   * Update a user
   */
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user
   */
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new UserManagementAPI();