import type { SiteConfig, ServiceItem, ProjectItem, EnquirySubmission } from '../types';
import type { PricingCategoryStructure } from '../data/pricingData';

const API_BASE = '/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('jaixo_admin_jwt');
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('jaixo_admin_jwt', token);
  } else {
    localStorage.removeItem('jaixo_admin_jwt');
  }
};

const getHeaders = (isFormData: boolean = false): HeadersInit => {
  const headers: HeadersInit = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// --- AUTH API ---
export async function apiLogin(passcodeOrUsername: string, password?: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: passcodeOrUsername,
      password: password || passcodeOrUsername,
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Authentication failed');
  }
  if (json.data?.token) {
    setAuthToken(json.data.token);
  }
  return json.data;
}

export async function apiVerifyToken(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/verify`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.success && json.data === true;
  } catch {
    return false;
  }
}

export async function apiChangePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to change password');
  }
}

// --- PROJECTS API ---
export async function apiFetchProjects(): Promise<ProjectItem[]> {
  const res = await fetch(`${API_BASE}/projects`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch projects');
  return json.data;
}

export async function apiCreateProject(project: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to create project');
  return json.data;
}

export async function apiUpdateProject(id: string, updates: Partial<ProjectItem>): Promise<ProjectItem> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to update project');
  return json.data;
}

export async function apiDeleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to delete project');
}

export async function apiMoveProject(id: string, direction: 'up' | 'down'): Promise<ProjectItem[]> {
  const res = await fetch(`${API_BASE}/projects/${id}/move`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ direction }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to reorder project');
  return json.data;
}

export async function apiToggleFeaturedProject(id: string): Promise<ProjectItem> {
  const res = await fetch(`${API_BASE}/projects/${id}/toggle-featured`, {
    method: 'POST',
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to toggle featured status');
  return json.data;
}

// --- SERVICES & PRICING API ---
export async function apiFetchServices(): Promise<ServiceItem[]> {
  const res = await fetch(`${API_BASE}/services`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch services');
  // Parse packages JSON string into structured array if needed
  return json.data.map((s: any) => ({
    ...s,
    packages: typeof s.packagesJson === 'string' ? JSON.parse(s.packagesJson) : (s.packages || []),
  }));
}

export async function apiUpdateServicePrice(serviceId: string, price: string): Promise<ServiceItem> {
  const res = await fetch(`${API_BASE}/services/${serviceId}/price`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ price }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to update service price');
  return json.data;
}

export async function apiFetchPricing(): Promise<PricingCategoryStructure[]> {
  const res = await fetch(`${API_BASE}/pricing`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch pricing');
  return json.data.map((cat: any) => ({
    ...cat,
    packages: typeof cat.packagesJson === 'string' ? JSON.parse(cat.packagesJson) : (cat.packages || []),
    additionalCharges: typeof cat.additionalChargesJson === 'string' ? JSON.parse(cat.additionalChargesJson) : (cat.additionalCharges || []),
  }));
}

export async function apiUpdatePackagePrice(serviceSlug: string, tierIndex: number, newPrice: string): Promise<void> {
  const res = await fetch(`${API_BASE}/pricing/package-price`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ serviceSlug, tierIndex, newPrice }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to update package price');
}

// --- SITE CONFIG API ---
export async function apiFetchSiteConfig(): Promise<SiteConfig> {
  const res = await fetch(`${API_BASE}/config`);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch site config');
  return json.data;
}

export async function apiUpdateSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig> {
  const res = await fetch(`${API_BASE}/config`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(config),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to update site config');
  return json.data;
}

// --- ENQUIRIES API ---
export async function apiFetchEnquiries(): Promise<EnquirySubmission[]> {
  const res = await fetch(`${API_BASE}/enquiries`, {
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to fetch enquiries');
  return json.data;
}

export async function apiSubmitEnquiry(enquiry: Omit<EnquirySubmission, 'id' | 'timestamp' | 'status'>): Promise<EnquirySubmission> {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to submit enquiry');
  return json.data;
}

export async function apiUpdateEnquiryStatus(id: string, status: string, internalNotes?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status, internalNotes }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to update enquiry status');
}

export async function apiDeleteEnquiry(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/enquiries/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Failed to delete enquiry');
}

// --- FILE UPLOADS API ---
export async function apiUploadImage(file: File): Promise<{ url: string; fileName: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/uploads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to upload image');
  }

  return {
    url: json.data.url,
    fileName: json.data.fileName,
  };
}
