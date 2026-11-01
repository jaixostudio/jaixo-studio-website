import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultSiteConfig } from '../data/siteConfig';
import { defaultServicesData } from '../data/servicesData';
import { defaultPricingData } from '../data/pricingData';
import { defaultProjectsData } from '../data/projectsData';
import type { SiteConfig, ServiceItem, ProjectItem, EnquirySubmission } from '../types';
import type { PricingCategoryStructure } from '../data/pricingData';
import {
  apiFetchProjects,
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
  apiMoveProject,
  apiToggleFeaturedProject,
  apiFetchServices,
  apiUpdateServicePrice,
  apiFetchPricing,
  apiUpdatePackagePrice,
  apiFetchSiteConfig,
  apiUpdateSiteConfig,
  apiFetchEnquiries,
  apiSubmitEnquiry,
  apiUpdateEnquiryStatus,
  apiDeleteEnquiry,
  getAuthToken,
} from '../services/api';

interface StudioContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => Promise<void> | void;
  services: ServiceItem[];
  updateServicePrice: (serviceId: string, newPrice: string) => Promise<void> | void;
  pricingData: PricingCategoryStructure[];
  updatePackagePrice: (serviceSlug: string, tierIndex: number, newPrice: string) => Promise<void> | void;
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<void> | void;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<void> | void;
  deleteProject: (id: string) => Promise<void> | void;
  moveProject: (id: string, direction: 'up' | 'down') => Promise<void> | void;
  toggleFeaturedProject: (id: string) => Promise<void> | void;
  enquiries: EnquirySubmission[];
  submitEnquiry: (enquiry: Omit<EnquirySubmission, 'id' | 'timestamp' | 'status'>) => Promise<boolean> | boolean;
  updateEnquiryStatus: (id: string, status: 'New' | 'In Review' | 'Responded') => Promise<void> | void;
  deleteEnquiry: (id: string) => Promise<void> | void;
  selectedProjectForModal: ProjectItem | null;
  openProjectModal: (project: ProjectItem) => void;
  closeProjectModal: () => void;
  quickEnquiryService: string | null;
  openQuickEnquiry: (serviceName?: string) => void;
  closeQuickEnquiry: () => void;
  resetToDefaults: () => void;
  isBackendConnected: boolean;
  refreshBackendData: () => Promise<void>;
}

const StudioDataContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CONFIG: 'jaixo_studio_config_v2',
  SERVICES: 'jaixo_studio_services_v1',
  PRICING: 'jaixo_studio_pricing_v1',
  PROJECTS: 'jaixo_studio_projects_v2',
  ENQUIRIES: 'jaixo_studio_enquiries_v1',
};

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Site Config
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : defaultSiteConfig;
    } catch {
      return defaultSiteConfig;
    }
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : defaultServicesData;
    } catch {
      return defaultServicesData;
    }
  });

  // Pricing
  const [pricingData, setPricingData] = useState<PricingCategoryStructure[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRICING);
      return saved ? JSON.parse(saved) : defaultPricingData;
    } catch {
      return defaultPricingData;
    }
  });

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed: ProjectItem[] = JSON.parse(saved);
        const hasFakeProjects = parsed.some((p) => p.id === 'proj-atelier-lumiere' || p.title.includes('Atelier Lumière'));
        if (!hasFakeProjects && parsed.length >= 50) return parsed;
      }
      return defaultProjectsData;
    } catch {
      return defaultProjectsData;
    }
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'enq-initial-01',
          timestamp: new Date().toISOString(),
          name: 'Demo Client',
          email: 'client@example.com',
          phone: '+91 95663 08652',
          service: 'Website Design & Development',
          budget: '₹25,000 - ₹50,000',
          description: 'Looking for a clean editorial portfolio website for our design practice.',
          status: 'New',
        },
      ];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [quickEnquiryService, setQuickEnquiryService] = useState<string | null>(null);

  // Sync to localStorage as client cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(pricingData));
    } catch (e) {
      console.error(e);
    }
  }, [pricingData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  // Load from Java Spring Boot MySQL backend
  const refreshBackendData = useCallback(async () => {
    try {
      const [fetchedProjects, fetchedServices, fetchedPricing, fetchedConfig] = await Promise.all([
        apiFetchProjects(),
        apiFetchServices(),
        apiFetchPricing(),
        apiFetchSiteConfig(),
      ]);

      if (fetchedProjects && fetchedProjects.length > 0) {
        setProjects(fetchedProjects);
      }
      if (fetchedServices && fetchedServices.length > 0) {
        setServices(fetchedServices);
      }
      if (fetchedPricing && fetchedPricing.length > 0) {
        setPricingData(fetchedPricing);
      }
      if (fetchedConfig) {
        setSiteConfig(fetchedConfig);
      }

      // If authenticated admin, also load enquiries from MySQL
      if (getAuthToken()) {
        try {
          const fetchedEnquiries = await apiFetchEnquiries();
          if (fetchedEnquiries) setEnquiries(fetchedEnquiries);
        } catch {
          // not authenticated or token expired
        }
      }

      setIsBackendConnected(true);
    } catch (err) {
      // Backend not running or unreachable: keep running independently with local state
      console.log('Running frontend independently (Backend offline or starting up)');
      setIsBackendConnected(false);
    }
  }, []);

  useEffect(() => {
    refreshBackendData();
  }, [refreshBackendData]);

  // Actions
  const updateSiteConfig = async (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...newConfig }));
    if (isBackendConnected) {
      try {
        await apiUpdateSiteConfig(newConfig);
      } catch (err) {
        console.error('Failed to update config on backend:', err);
      }
    }
  };

  const updateServicePrice = async (serviceId: string, newPrice: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, startingPriceINR: newPrice } : s))
    );
    if (isBackendConnected) {
      try {
        await apiUpdateServicePrice(serviceId, newPrice);
      } catch (err) {
        console.error('Failed to update service price on backend:', err);
      }
    }
  };

  const updatePackagePrice = async (serviceSlug: string, tierIndex: number, newPrice: string) => {
    setPricingData((prev) =>
      prev.map((cat) => {
        if (cat.serviceSlug === serviceSlug) {
          const updatedPackages = [...cat.packages];
          if (updatedPackages[tierIndex]) {
            updatedPackages[tierIndex] = { ...updatedPackages[tierIndex], price: newPrice };
          }
          return { ...cat, packages: updatedPackages };
        }
        return cat;
      })
    );
    if (isBackendConnected) {
      try {
        await apiUpdatePackagePrice(serviceSlug, tierIndex, newPrice);
      } catch (err) {
        console.error('Failed to update package price on backend:', err);
      }
    }
  };

  const addProject = async (projectData: Omit<ProjectItem, 'id'>) => {
    const tempId = `proj-${Date.now()}`;
    const newProject: ProjectItem = {
      ...projectData,
      id: tempId,
    };
    setProjects((prev) => [newProject, ...prev]);

    if (isBackendConnected) {
      try {
        const created = await apiCreateProject(projectData);
        setProjects((prev) => prev.map((p) => (p.id === tempId ? created : p)));
      } catch (err) {
        console.error('Failed to persist project to backend:', err);
      }
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    if (isBackendConnected) {
      try {
        await apiUpdateProject(id, updatedFields);
      } catch (err) {
        console.error('Failed to update project on backend:', err);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));

    if (isBackendConnected) {
      try {
        await apiDeleteProject(id);
      } catch (err) {
        console.error('Failed to delete project on backend:', err);
      }
    }
  };

  const moveProject = async (id: string, direction: 'up' | 'down') => {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const newProjects = [...prev];
      const temp = newProjects[index];
      newProjects[index] = newProjects[targetIndex];
      newProjects[targetIndex] = temp;
      return newProjects;
    });

    if (isBackendConnected) {
      try {
        const reordered = await apiMoveProject(id, direction);
        if (reordered && reordered.length > 0) setProjects(reordered);
      } catch (err) {
        console.error('Failed to move project on backend:', err);
      }
    }
  };

  const toggleFeaturedProject = async (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );

    if (isBackendConnected) {
      try {
        await apiToggleFeaturedProject(id);
      } catch (err) {
        console.error('Failed to toggle featured on backend:', err);
      }
    }
  };

  const submitEnquiry = async (enquiryData: Omit<EnquirySubmission, 'id' | 'timestamp' | 'status'>) => {
    const tempId = `enq-${Date.now()}`;
    const newSubmission: EnquirySubmission = {
      ...enquiryData,
      id: tempId,
      timestamp: new Date().toISOString(),
      status: 'New',
    };
    setEnquiries((prev) => [newSubmission, ...prev]);

    if (isBackendConnected) {
      try {
        const created = await apiSubmitEnquiry(enquiryData);
        setEnquiries((prev) => prev.map((e) => (e.id === tempId ? created : e)));
      } catch (err) {
        console.error('Failed to submit enquiry to backend:', err);
      }
    }
    return true;
  };

  const updateEnquiryStatus = async (id: string, status: 'New' | 'In Review' | 'Responded') => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );

    if (isBackendConnected) {
      try {
        await apiUpdateEnquiryStatus(id, status);
      } catch (err) {
        console.error('Failed to update enquiry status on backend:', err);
      }
    }
  };

  const deleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));

    if (isBackendConnected) {
      try {
        await apiDeleteEnquiry(id);
      } catch (err) {
        console.error('Failed to delete enquiry on backend:', err);
      }
    }
  };

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProjectForModal(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProjectForModal(null);
    document.body.style.overflow = 'auto';
  };

  const openQuickEnquiry = (serviceName?: string) => {
    setQuickEnquiryService(serviceName || 'General Project Enquiry');
    document.body.style.overflow = 'hidden';
  };

  const closeQuickEnquiry = () => {
    setQuickEnquiryService(null);
    document.body.style.overflow = 'auto';
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PRICING);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    setSiteConfig(defaultSiteConfig);
    setServices(defaultServicesData);
    setPricingData(defaultPricingData);
    setProjects(defaultProjectsData);
  };

  return (
    <StudioDataContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        services,
        updateServicePrice,
        pricingData,
        updatePackagePrice,
        projects,
        addProject,
        updateProject,
        deleteProject,
        moveProject,
        toggleFeaturedProject,
        enquiries,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        selectedProjectForModal,
        openProjectModal,
        closeProjectModal,
        quickEnquiryService,
        openQuickEnquiry,
        closeQuickEnquiry,
        resetToDefaults,
        isBackendConnected,
        refreshBackendData,
      }}
    >
      {children}
    </StudioDataContext.Provider>
  );
};

export const useStudioData = () => {
  const context = useContext(StudioDataContext);
  if (!context) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return context;
};
