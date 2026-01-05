import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  }

  async logout() {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  }

  // Contracts
  async uploadContract(file: File, metadata?: Record<string, any>) {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await this.client.post('/contracts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log('Upload progress:', percentCompleted);
      },
    });
    return response.data;
  }

  async getContract(id: string) {
    const response = await this.client.get(`/contracts/${id}`);
    return response.data;
  }

  async getContracts(params?: {
    limit?: number;
    offset?: number;
    status?: string;
    riskLevel?: string;
  }) {
    const response = await this.client.get('/contracts', { params });
    return response.data;
  }

  async deleteContract(id: string) {
    const response = await this.client.delete(`/contracts/${id}`);
    return response.data;
  }

  // Agents
  async runAgent(contractId: string, agentType: string) {
    const response = await this.client.post('/agents/run', {
      contractId,
      agentType,
    });
    return response.data;
  }

  async getAgentStatus(jobId: string) {
    const response = await this.client.get(`/agents/status/${jobId}`);
    return response.data;
  }

  // Dashboard
  async getDashboardStats() {
    const response = await this.client.get('/dashboard/stats');
    return response.data;
  }

  async getRiskTrends(period: string = '6m') {
    const response = await this.client.get('/dashboard/risk-trends', {
      params: { period },
    });
    return response.data;
  }

  // Compliance
  async getComplianceReport(contractId?: string) {
    const response = await this.client.get('/compliance/report', {
      params: { contractId },
    });
    return response.data;
  }

  async getAuditLogs(params?: {
    limit?: number;
    userId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const response = await this.client.get('/compliance/audit-logs', { params });
    return response.data;
  }

  // Obligations
  async getObligations(contractId?: string) {
    const response = await this.client.get('/obligations', {
      params: { contractId },
    });
    return response.data;
  }

  async updateObligation(id: string, data: any) {
    const response = await this.client.put(`/obligations/${id}`, data);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
