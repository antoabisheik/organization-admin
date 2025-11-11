// app/api/support-tickets-api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class SupportTicketsAPI {
  /**
   * Get all support tickets
   */
  async getAllTickets(organizationId = null) {
    try {
      const url = organizationId 
        ? `${API_BASE_URL}/api/admin/support-tickets?organizationId=${organizationId}`
        : `${API_BASE_URL}/api/admin/support-tickets`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tickets');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  }

  /**
   * Get ticket statistics
   */
  async getStatistics(organizationId = null) {
    try {
      const url = organizationId 
        ? `${API_BASE_URL}/api/admin/support-tickets/statistics?organizationId=${organizationId}`
        : `${API_BASE_URL}/api/admin/support-tickets/statistics`;

      const response = await fetch(url, {
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
   * Create a new support ticket
   */
  async createTicket(ticketData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/support-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(ticketData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create ticket');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  }

  /**
   * Update ticket status
   */
  async updateTicketStatus(ticketId, status, organizationId = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/support-tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status, organizationId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update ticket status');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating ticket status:', error);
      throw error;
    }
  }

  /**
   * Send a message to a ticket
   */
  async sendMessage(ticketId, message, organizationId = null) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/support-tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message, organizationId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Get a specific ticket
   */
  async getTicket(ticketId, organizationId = null) {
    try {
      const url = organizationId 
        ? `${API_BASE_URL}/api/admin/support-tickets/${ticketId}?organizationId=${organizationId}`
        : `${API_BASE_URL}/api/admin/support-tickets/${ticketId}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch ticket');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  }

  /**
   * Delete a ticket
   */
  async deleteTicket(ticketId, organizationId = null) {
    try {
      const url = organizationId 
        ? `${API_BASE_URL}/api/admin/support-tickets/${ticketId}?organizationId=${organizationId}`
        : `${API_BASE_URL}/api/admin/support-tickets/${ticketId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    }
  }
}

export default new SupportTicketsAPI();