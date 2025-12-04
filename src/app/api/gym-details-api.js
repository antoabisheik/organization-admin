// app/api/gym-details-api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class GymDetailsAPI {
  /**
   * Get complete gym details
   */
  async getGymDetails(gymId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/gyms/${gymId}/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch gym details');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching gym details:', error);
      throw error;
    }
  }

  /**
   * Add a new coach
   */
  async addCoach(gymId, coachData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/gyms/${gymId}/coaches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(coachData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add coach');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error adding coach:', error);
      throw error;
    }
  }

  /**
   * Update a coach
   */
  async updateCoach(gymId, coachId, coachData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/gyms/${gymId}/coaches/${coachId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(coachData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update coach');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating coach:', error);
      throw error;
    }
  }

  /**
   * Assign head coach
   */
  async assignHeadCoach(gymId, coachId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/gyms/${gymId}/coaches/${coachId}/assign-head-coach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign head coach');
      }

      return await response.json();
    } catch (error) {
      console.error('Error assigning head coach:', error);
      throw error;
    }
  }

  /**
   * Unassign head coach
   */
  async unassignHeadCoach(gymId, coachId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/gyms/${gymId}/coaches/${coachId}/unassign-head-coach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to unassign head coach');
      }

      return await response.json();
    } catch (error) {
      console.error('Error unassigning head coach:', error);
      throw error;
    }
  }
}

export default new GymDetailsAPI();