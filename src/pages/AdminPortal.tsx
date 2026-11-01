import React, { useState, useRef } from 'react';
import { 
  Lock, 
  Save, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Edit3, 
  Download, 
  CheckCircle, 
  DollarSign,
  Briefcase,
  Settings,
  Mail,
  X,
  Upload,
  Image as ImageIcon,
  Star,
  ChevronUp,
  ChevronDown,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStudioData } from '../context/StudioDataContext';
import type { ProjectCategory, ProjectItem } from '../types';
import { apiLogin, apiUploadImage, getAuthToken, setAuthToken } from '../services/api';

interface AdminPortalProps {
  onClose: () => void;
}

const GENUINE_CATEGORIES: ProjectCategory[] = [
  'Event & Promotional Posters',
  'Commercial Advertisements',
  'Awareness & Social Campaigns',
  'Festival & Celebration Designs',
  'College & Technical Event Designs',
  'Organisational & Corporate Designs',
  'Calendars & Event Collages',
];

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const { 
    siteConfig, 
    updateSiteConfig, 
    services, 
    updateServicePrice, 
    updatePackagePrice,
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    moveProject,
    toggleFeaturedProject,
    enquiries, 
    updateEnquiryStatus, 
    deleteEnquiry,
    resetToDefaults,
    isBackendConnected,
    refreshBackendData
  } = useStudioData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAuthToken());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'config' | 'pricing' | 'portfolio' | 'enquiries'>('portfolio');

  // Form states for Config
  const [configForm, setConfigForm] = useState(siteConfig);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  // Form states for New / Edit Project
  const [isEditingProject, setIsEditingProject] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectSaveSuccess, setProjectSaveSuccess] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [imageUploadInfo, setImageUploadInfo] = useState<{
    name: string;
    size: string;
    dimensions: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Portfolio list filters
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>('All');
  const [adminFeaturedOnly, setAdminFeaturedOnly] = useState(false);

  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Event & Promotional Posters' as ProjectCategory,
    client: '',
    year: '2025',
    projectDate: '2025',
    designType: 'Digital Promotional Poster',
    description: '',
    deliverables: 'Original High-Resolution Poster Artwork\nSocial Media Broadcast Ready Layout\nPrint-Ready Vector Master File',
    toolsUsed: 'Photoshop, Illustrator',
    previewImage: '',
    fullImage: '',
    featured: false,
  });

  // Authentication with Spring Boot Backend & Fallback
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const code = passcode.trim();
    try {
      await apiLogin(code);
      setIsAuthenticated(true);
      await refreshBackendData();
    } catch (err: any) {
      if (code === 'jaixo2026' || code === 'admin') {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError(err.message || 'Invalid studio passcode. Default is jaixo2026');
      }
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configForm);
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 3000);
  };

  // Image Upload with Spring Boot Backend Storage & Local Preview Fallback
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploadError(null);

    // Validate type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validMimes.includes(file.type)) {
      setImageUploadError('Invalid format. Please upload JPG, PNG, WEBP, or SVG.');
      return;
    }

    // Validate size (max 15MB)
    const maxSizeBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setImageUploadError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Limit is 15MB.`);
      return;
    }

    // Set local image info preview
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageUploadInfo({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          dimensions: `${img.width} × ${img.height} px`,
        });
        setProjectForm((prev) => ({
          ...prev,
          previewImage: dataUrl,
          fullImage: dataUrl,
        }));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    // If Spring Boot backend is connected, upload physically to /uploads
    if (isBackendConnected && getAuthToken()) {
      try {
        const uploadRes = await apiUploadImage(file);
        if (uploadRes?.url) {
          setProjectForm((prev) => ({
            ...prev,
            previewImage: uploadRes.url,
            fullImage: uploadRes.url,
          }));
        }
      } catch (err) {
        console.warn('Physical backend upload fallback to dataUrl preview:', err);
      }
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }
    if (!projectForm.previewImage.trim()) {
      alert('Please upload or specify a design image');
      return;
    }

    const deliverablesArray = projectForm.deliverables
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const toolsArray = projectForm.toolsUsed
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isEditingProject) {
      updateProject(isEditingProject, {
        title: projectForm.title.trim(),
        category: projectForm.category,
        client: projectForm.client.trim(),
        year: projectForm.year.trim(),
        projectDate: projectForm.projectDate.trim() || projectForm.year.trim(),
        designType: projectForm.designType.trim(),
        description: projectForm.description.trim(),
        deliverables: deliverablesArray.length > 0 ? deliverablesArray : ['Custom Studio Deliverables'],
        toolsUsed: toolsArray.length > 0 ? toolsArray : ['Photoshop', 'Illustrator'],
        previewImage: projectForm.previewImage,
        fullImage: projectForm.fullImage || projectForm.previewImage,
        featured: projectForm.featured,
      });
      setProjectSaveSuccess(`Project "${projectForm.title}" updated successfully!`);
      setIsEditingProject(null);
    } else {
      addProject({
        title: projectForm.title.trim(),
        category: projectForm.category,
        client: projectForm.client.trim() || 'Studio Commission',
        year: projectForm.year.trim() || '2025',
        projectDate: projectForm.projectDate.trim() || '2025',
        designType: projectForm.designType.trim() || 'Graphic Design Artwork',
        description: projectForm.description.trim() || 'Original creative design work by JAIXO STUDIO.',
        deliverables: deliverablesArray.length > 0 ? deliverablesArray : ['Custom Studio Deliverables'],
        toolsUsed: toolsArray.length > 0 ? toolsArray : ['Photoshop', 'Illustrator'],
        previewImage: projectForm.previewImage,
        fullImage: projectForm.fullImage || projectForm.previewImage,
        featured: projectForm.featured,
      });
      setProjectSaveSuccess(`Project "${projectForm.title}" published successfully to studio catalog!`);
      setIsAddingProject(false);
    }

    // Reset form
    setProjectForm({
      title: '',
      category: 'Event & Promotional Posters',
      client: '',
      year: '2025',
      projectDate: '2025',
      designType: 'Digital Promotional Poster',
      description: '',
      deliverables: 'Original High-Resolution Poster Artwork\nSocial Media Broadcast Ready Layout\nPrint-Ready Vector Master File',
      toolsUsed: 'Photoshop, Illustrator',
      previewImage: '',
      fullImage: '',
      featured: false,
    });
    setImageUploadInfo(null);
    setImageUploadError(null);

    setTimeout(() => setProjectSaveSuccess(null), 4000);
  };

  const handleStartEditProject = (p: ProjectItem) => {
    setIsEditingProject(p.id);
    setIsAddingProject(true);
    setProjectForm({
      title: p.title,
      category: p.category,
      client: p.client || '',
      year: p.year || '',
      projectDate: p.projectDate || p.year || '',
      designType: p.designType || '',
      description: p.description || '',
      deliverables: p.deliverables.join('\n'),
      toolsUsed: p.toolsUsed.join(', '),
      previewImage: p.previewImage,
      fullImage: p.fullImage || p.previewImage,
      featured: !!p.featured,
    });
    setImageUploadInfo(null);
    setImageUploadError(null);

    // Scroll form into view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportEnquiriesJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(enquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jaixo_studio_enquiries_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter projects in Admin
  const filteredAdminProjects = projects.filter((p) => {
    const matchesSearch = adminSearch === '' || 
      p.title.toLowerCase().includes(adminSearch.toLowerCase()) ||
      p.client.toLowerCase().includes(adminSearch.toLowerCase()) ||
      (p.designType && p.designType.toLowerCase().includes(adminSearch.toLowerCase()));
    
    const matchesCategory = adminCategoryFilter === 'All' || p.category === adminCategoryFilter;
    const matchesFeatured = !adminFeaturedOnly || !!p.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const featuredCount = projects.filter((p) => p.featured).length;

  // Lockscreen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#0F131D] border border-[#252B36] shadow-2xl space-y-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#10141D] text-[#A5AAB5] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#078BFF]/10 border border-[#078BFF]/40 text-[#078BFF] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-heading font-bold text-[#F5F5F2]">
              JAIXO STUDIO Content Manager
            </h2>
            <p className="text-xs text-[#A5AAB5]">
              Administrative control to upload real designs, reorder featured works, and manage prices.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Studio Passcode (Default: jaixo2026)"
                className="w-full px-4 py-3 rounded-xl bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-sm text-center text-[#F5F5F2] placeholder-[#A5AAB5]/40"
              />
              {authError && <p className="text-red-400 text-xs mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Unlock Studio Console
            </button>
          </form>

          <p className="text-[11px] text-[#A5AAB5]/70">
            Passcode: <code className="text-[#078BFF]">jaixo2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-[#0F131D] border border-[#252B36] rounded-3xl shadow-2xl flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#10141D] border-b border-[#252B36]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#080B12] border border-[#078BFF]/40 flex items-center justify-center text-xs font-heading font-black text-white">
              J<span className="text-[#078BFF]">X</span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-heading font-bold text-[#F5F5F2]">
                JAIXO STUDIO — Studio Management Console
              </h2>
              <span className="text-[11px] text-[#A5AAB5]">
                {projects.length} Genuine Projects Loaded • {featuredCount} Featured on Homepage
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium border border-[#252B36] bg-[#080B12]">
              <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {isBackendConnected ? 'Java Spring Boot & MySQL Connected (Port 8082)' : 'Frontend Standalone Mode'}
              </span>
            </div>

            <button
              onClick={() => {
                setAuthToken(null);
                setIsAuthenticated(false);
              }}
              title="Log out of console"
              className="px-2.5 py-1.5 rounded-lg bg-[#080B12] hover:bg-[#252B36] border border-[#252B36] text-[11px] text-[#A5AAB5] hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all pricing, projects, and contact data to verified studio defaults?')) {
                  resetToDefaults();
                  setConfigForm(siteConfig);
                }
              }}
              title="Reset all data to defaults"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B12] hover:bg-[#252B36] border border-[#252B36] text-[11px] text-amber-400 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#080B12] hover:bg-[#252B36] text-[#A5AAB5] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-[#252B36] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'portfolio', label: `Projects Catalog (${projects.length})`, icon: <Briefcase className="w-3.5 h-3.5" /> },
            { id: 'pricing', label: 'Service Pricing (INR)', icon: <DollarSign className="w-3.5 h-3.5" /> },
            { id: 'config', label: 'Studio Identity & Contact', icon: <Settings className="w-3.5 h-3.5" /> },
            { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: <Mail className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsAddingProject(false);
                setIsEditingProject(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#078BFF] text-white font-semibold shadow-lg shadow-[#078BFF]/20'
                  : 'bg-[#10141D] text-[#A5AAB5] hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* TAB 1: PORTFOLIO PROJECTS */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Success Feedback Alert */}
              {projectSaveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium">{projectSaveSuccess}</span>
                  </div>
                  <button 
                    onClick={() => setProjectSaveSuccess(null)}
                    className="text-emerald-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Action & Filter Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#F5F5F2]">
                    Genuine Portfolio Catalog
                  </h3>
                  <p className="text-xs text-[#A5AAB5]">
                    Add genuine design projects, upload original artwork, reorder featured showcase, or update client information.
                  </p>
                </div>

                {!isAddingProject && (
                  <button
                    onClick={() => {
                      setIsAddingProject(true);
                      setIsEditingProject(null);
                      setProjectForm({
                        title: '',
                        category: 'Event & Promotional Posters',
                        client: '',
                        year: '2025',
                        projectDate: '2025',
                        designType: 'Digital Promotional Poster',
                        description: '',
                        deliverables: 'Original High-Resolution Poster Artwork\nSocial Media Broadcast Ready Layout\nPrint-Ready Vector Master File',
                        toolsUsed: 'Photoshop, Illustrator',
                        previewImage: '',
                        fullImage: '',
                        featured: false,
                      });
                      setImageUploadInfo(null);
                      setImageUploadError(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg shadow-[#078BFF]/25 self-start lg:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                )}
              </div>

              {/* ================= ADD / EDIT PROJECT FORM ================= */}
              {isAddingProject && (
                <form 
                  onSubmit={handleSaveProject} 
                  className="p-6 rounded-2xl bg-[#10141D] border border-[#078BFF]/40 shadow-xl space-y-6"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#252B36]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#078BFF] animate-pulse" />
                      <h4 className="text-sm font-heading font-bold text-[#F5F5F2]">
                        {isEditingProject ? `Edit Project (${projectForm.title || 'Untitled'})` : 'Add New Genuine Portfolio Project'}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProject(false);
                        setIsEditingProject(null);
                      }}
                      className="text-xs text-[#A5AAB5] hover:text-white flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>

                  {/* Primary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Shatranj 2.0 Chess Competition"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Genuine Category *
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      >
                        {GENUINE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Client / Organisation (Verified)
                      </label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        placeholder="e.g. Rotaract Club of Erode Kalam"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Design Type / Format
                      </label>
                      <input
                        type="text"
                        value={projectForm.designType}
                        onChange={(e) => setProjectForm({ ...projectForm, designType: e.target.value })}
                        placeholder="e.g. Commercial Product Promotion"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Verified Year
                      </label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        placeholder="e.g. 2025"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Featured on Homepage?
                      </label>
                      <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                          className="w-4 h-4 accent-[#078BFF] rounded"
                        />
                        <span className="flex items-center gap-1.5">
                          <Star className={`w-3.5 h-3.5 ${projectForm.featured ? 'text-amber-400 fill-amber-400' : 'text-[#A5AAB5]'}`} />
                          <span>Feature in Selected Works Showcase</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* ================= IMAGE UPLOAD & PREVIEW SECTION ================= */}
                  <div className="p-4 rounded-xl bg-[#080B12] border border-[#252B36] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#F5F5F2]">
                          Original Artwork Image *
                        </label>
                        <span className="text-[11px] text-[#A5AAB5]">
                          Upload a high-resolution design image (JPG, PNG, WebP) or specify an archive path.
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageFileChange}
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10141D] hover:bg-[#078BFF] text-white border border-[#252B36] hover:border-[#078BFF] text-xs font-medium cursor-pointer transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image File</span>
                        </button>
                      </div>
                    </div>

                    {imageUploadError && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span>{imageUploadError}</span>
                      </div>
                    )}

                    {imageUploadInfo && (
                      <div className="p-2.5 rounded-lg bg-[#10141D] border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-3">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">Uploaded: <strong>{imageUploadInfo.name}</strong></span>
                        <span>• {imageUploadInfo.size}</span>
                        <span>• {imageUploadInfo.dimensions}</span>
                      </div>
                    )}

                    {/* Image Preview & Path Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                      <div className="sm:col-span-8">
                        <label className="block text-[10px] text-[#A5AAB5] uppercase mb-1">
                          Image Source Path or Data URL
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.previewImage}
                          onChange={(e) => setProjectForm({ ...projectForm, previewImage: e.target.value, fullImage: e.target.value })}
                          placeholder="e.g. /portfolio/01-shatranj-2-chess-competition.jpg or data:image/..."
                          className="w-full px-3 py-2 rounded bg-[#10141D] border border-[#252B36] text-xs text-[#F5F5F2] font-mono"
                        />
                        <span className="text-[10px] text-[#A5AAB5] block mt-1">
                          Images stored in <code className="text-[#078BFF]">/portfolio/01-...jpg</code> through <code className="text-[#078BFF]">/portfolio/55-...jpg</code>
                        </span>
                      </div>

                      {/* Live Thumbnail Preview */}
                      <div className="sm:col-span-4 flex items-center gap-3">
                        {projectForm.previewImage ? (
                          <div className="relative group w-24 h-32 rounded-lg bg-[#10141D] border border-[#078BFF]/40 overflow-hidden shrink-0 flex items-center justify-center p-1">
                            <img
                              src={projectForm.previewImage}
                              alt="Live Preview"
                              className="w-full h-full object-contain rounded"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[9px] text-white font-medium uppercase">Preview</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-24 h-32 rounded-lg bg-[#10141D] border border-dashed border-[#252B36] flex flex-col items-center justify-center text-[#A5AAB5] text-center p-2 shrink-0">
                            <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                            <span className="text-[9px]">No image selected</span>
                          </div>
                        )}
                        <div className="text-xs text-[#A5AAB5] space-y-1">
                          <p className="font-semibold text-white">Live Artwork Preview</p>
                          <p className="text-[11px]">Inspect visual framing before saving to the studio catalog.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description & Deliverables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Project Description
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Detailed overview of layout, typography, visual hierarchy, and commission purpose..."
                        className="w-full px-3 py-2 rounded bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Tools Used (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={projectForm.toolsUsed}
                        onChange={(e) => setProjectForm({ ...projectForm, toolsUsed: e.target.value })}
                        placeholder="Photoshop, Illustrator"
                        className="w-full px-3 py-2 rounded bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2] mb-3"
                      />

                      <label className="block text-[11px] font-heading font-semibold uppercase tracking-wider text-[#A5AAB5] mb-1">
                        Deliverables (One per line)
                      </label>
                      <textarea
                        rows={2}
                        value={projectForm.deliverables}
                        onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                        placeholder="Digital Poster Layout&#10;Social Media Broadcast Creative"
                        className="w-full px-3 py-2 rounded bg-[#080B12] border border-[#252B36] focus:border-[#078BFF] focus:outline-none text-xs text-[#F5F5F2]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#078BFF]/25"
                    >
                      {isEditingProject ? 'Save Changes' : 'Publish Project'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingProject(false);
                        setIsEditingProject(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#252B36] hover:bg-[#323946] text-[#F5F5F2] text-xs font-semibold uppercase transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* ================= PORTFOLIO FILTER & SEARCH BAR ================= */}
              <div className="p-4 rounded-xl bg-[#10141D] border border-[#252B36] flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-[#A5AAB5] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search projects by title, client, type..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-white placeholder-[#A5AAB5]/50 focus:border-[#078BFF] focus:outline-none"
                    />
                  </div>

                  <select
                    value={adminCategoryFilter}
                    onChange={(e) => setAdminCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#A5AAB5] focus:border-[#078BFF] focus:outline-none"
                  >
                    <option value="All">All Categories ({projects.length})</option>
                    {GENUINE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat} ({projects.filter((p) => p.category === cat).length})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setAdminFeaturedOnly(!adminFeaturedOnly)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      adminFeaturedOnly
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-[#080B12] text-[#A5AAB5] border-[#252B36] hover:text-white'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${adminFeaturedOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>Featured Only ({featuredCount})</span>
                  </button>

                  <span className="text-[11px] text-[#A5AAB5]">
                    Showing {filteredAdminProjects.length} of {projects.length}
                  </span>
                </div>
              </div>

              {/* ================= PROJECTS TABLE & REORDERING ================= */}
              <div className="overflow-x-auto rounded-xl border border-[#252B36]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#10141D] border-b border-[#252B36] text-[#A5AAB5] uppercase font-heading text-[11px]">
                      <th className="py-3 px-3 w-16 text-center">Reorder</th>
                      <th className="py-3 px-3 w-14">Artwork</th>
                      <th className="py-3 px-3">Title & Design Type</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Verified Client</th>
                      <th className="py-3 px-3 w-16 text-center">Year</th>
                      <th className="py-3 px-3 w-20 text-center">Featured</th>
                      <th className="py-3 px-3 w-24 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252B36]/60 bg-[#0F131D] text-[#A5AAB5]">
                    {filteredAdminProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#10141D] transition-colors">
                        {/* Reorder Buttons */}
                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center gap-0.5">
                            <button
                              onClick={() => moveProject(p.id, 'up')}
                              title="Move project up"
                              className="p-1 rounded hover:bg-[#252B36] text-[#A5AAB5] hover:text-[#078BFF] cursor-pointer"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveProject(p.id, 'down')}
                              title="Move project down"
                              className="p-1 rounded hover:bg-[#252B36] text-[#A5AAB5] hover:text-[#078BFF] cursor-pointer"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Thumbnail */}
                        <td className="py-2.5 px-3">
                          <div className="w-10 h-14 bg-[#080B12] rounded border border-[#252B36] overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                            <img
                              src={p.previewImage}
                              alt=""
                              className="w-full h-full object-contain rounded"
                            />
                          </div>
                        </td>

                        {/* Title & Design Type */}
                        <td className="py-2.5 px-3 max-w-xs">
                          <div className="font-semibold text-[#F5F5F2] truncate">
                            {p.title}
                          </div>
                          {p.designType && (
                            <div className="text-[10px] text-[#078BFF] truncate">
                              {p.designType}
                            </div>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#10141D] border border-[#252B36] text-[10px] text-[#078BFF] whitespace-nowrap">
                            {p.category}
                          </span>
                        </td>

                        {/* Client */}
                        <td className="py-2.5 px-3 text-[11px] truncate max-w-[180px]">
                          {p.client || '—'}
                        </td>

                        {/* Year */}
                        <td className="py-2.5 px-3 text-center text-mono text-[11px]">
                          {p.year || '—'}
                        </td>

                        {/* Featured Toggle */}
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => toggleFeaturedProject(p.id)}
                            title={p.featured ? 'Featured on Homepage (Click to disable)' : 'Not featured (Click to feature)'}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              p.featured 
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                                : 'bg-[#080B12] border-[#252B36] text-[#A5AAB5]/40 hover:text-white hover:border-[#A5AAB5]'
                            }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${p.featured ? 'fill-amber-400' : ''}`} />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-2.5 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleStartEditProject(p)}
                            className="p-1.5 rounded-lg bg-[#10141D] hover:bg-[#252B36] text-[#A5AAB5] hover:text-white cursor-pointer"
                            title="Edit project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${p.title}"? This cannot be undone.`)) {
                                deleteProject(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-[#10141D] hover:bg-red-950/60 text-[#A5AAB5] hover:text-red-400 cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICE PRICING (INR) */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-[#F5F5F2]">
                  Service Baseline & Package Pricing (INR ₹)
                </h3>
                <p className="text-xs text-[#A5AAB5]">
                  Update starting prices or package rates in one place. Changes are stored locally and reflected site-wide immediately.
                </p>
              </div>

              <div className="space-y-6">
                {services.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl bg-[#10141D] border border-[#252B36] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-heading font-bold text-[#F5F5F2]">
                          {srv.title}
                        </h4>
                        <span className="text-[11px] text-[#A5AAB5]">{srv.category}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#A5AAB5]">Starting Price:</span>
                        <input
                          type="text"
                          value={srv.startingPriceINR}
                          onChange={(e) => updateServicePrice(srv.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs font-bold text-[#078BFF] w-48 text-right focus:border-[#078BFF] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Sub-packages */}
                    <div className="pt-3 border-t border-[#252B36] grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {srv.packages.map((pkg, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#080B12] border border-[#252B36] space-y-2">
                          <span className="text-[11px] font-heading font-semibold text-[#F5F5F2] block truncate">
                            {pkg.name}
                          </span>
                          <input
                            type="text"
                            value={pkg.priceINR}
                            onChange={(e) => updatePackagePrice(srv.slug, idx, e.target.value)}
                            className="w-full px-2.5 py-1 rounded bg-[#10141D] border border-[#252B36] text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDIO IDENTITY & CONTACT LINKS */}
          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-heading font-bold text-[#F5F5F2]">
                  Brand Information & Social Links
                </h3>
                <p className="text-xs text-[#A5AAB5]">
                  Updates here instantly reflect across headers, footers, and enquiry links.
                </p>
              </div>

              {configSaveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Studio contact details saved successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={configForm.brandName}
                    onChange={(e) => setConfigForm({ ...configForm, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={configForm.tagline}
                    onChange={(e) => setConfigForm({ ...configForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={configForm.instagramHandle}
                    onChange={(e) => setConfigForm({ ...configForm, instagramHandle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={configForm.instagramUrl}
                    onChange={(e) => setConfigForm({ ...configForm, instagramUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    WhatsApp Enquiry Number
                  </label>
                  <input
                    type="text"
                    value={configForm.whatsappNumber}
                    onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Studio Contact Email
                  </label>
                  <input
                    type="email"
                    value={configForm.contactEmail}
                    onChange={(e) => setConfigForm({ ...configForm, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Studio Working Hours
                  </label>
                  <input
                    type="text"
                    value={configForm.workingHours}
                    onChange={(e) => setConfigForm({ ...configForm, workingHours: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                    Studio Location Label
                  </label>
                  <input
                    type="text"
                    value={configForm.location}
                    onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-[#A5AAB5] uppercase mb-1">
                  Brand Positioning Summary
                </label>
                <textarea
                  rows={2}
                  value={configForm.positioning}
                  onChange={(e) => setConfigForm({ ...configForm, positioning: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#080B12] border border-[#252B36] text-xs text-[#F5F5F2]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#078BFF] hover:bg-[#0077e6] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Studio Settings</span>
              </button>
            </form>
          )}

          {/* TAB 4: ENQUIRIES INBOX */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#F5F5F2]">
                    Client Project Enquiries ({enquiries.length})
                  </h3>
                  <p className="text-xs text-[#A5AAB5]">
                    Submitted leads and project briefs captured from the website forms.
                  </p>
                </div>

                <button
                  onClick={exportEnquiriesJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10141D] hover:bg-[#252B36] border border-[#252B36] text-xs text-[#078BFF] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to JSON</span>
                </button>
              </div>

              {enquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#A5AAB5]">
                  No enquiry submissions found.
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-[#10141D] border border-[#252B36] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-[#F5F5F2]">
                            {enq.name}
                          </span>
                          <span className="text-xs text-[#A5AAB5]">({enq.email})</span>
                          <span className="text-xs text-[#078BFF]">• {enq.phone}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-2.5 py-1 rounded bg-[#080B12] border border-[#252B36] text-xs text-[#A5AAB5]"
                          >
                            <option value="New">Status: New</option>
                            <option value="In Review">Status: In Review</option>
                            <option value="Responded">Status: Responded</option>
                          </select>

                          <button
                            onClick={() => deleteEnquiry(enq.id)}
                            className="p-1 rounded bg-[#080B12] text-[#A5AAB5] hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#A5AAB5]">
                        <div>Service: <strong className="text-white">{enq.service}</strong></div>
                        <div>Budget: <strong className="text-[#078BFF]">{enq.budget}</strong></div>
                        <div>Date: <span>{new Date(enq.timestamp).toLocaleDateString()}</span></div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080B12] border border-[#252B36] text-xs text-[#A5AAB5] leading-relaxed">
                        {enq.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
