import type {
  EducationEntry,
  ExperienceEntry,
  PortfolioSnapshot,
  ProfileData,
  ProjectData,
  TechItem,
  TechMemory,
} from '../types/portfolio';

async function requestJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const portfolioApi = {
  getPublicPortfolio: () => requestJson<PortfolioSnapshot>('/api/portfolio'),

  // Auth
  getSession: () =>
    requestJson<{ authenticated: boolean; admin?: { email: string } }>('/api/auth/me'),
  login: (email: string, password: string) =>
    requestJson<{ authenticated: boolean; admin: { email: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    requestJson<{ authenticated: boolean }>('/api/auth/logout', { method: 'POST' }),

  // Admin Snapshot
  getAdminPortfolio: () => requestJson<PortfolioSnapshot>('/api/admin/portfolio'),

  // File Upload
  uploadFile: async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return requestJson<{
      url: string;
      originalName: string;
      mimeType: string;
      size: number;
    }>('/api/admin/upload', {
      method: 'POST',
      body: form,
    });
  },

  // Profile
  updateProfile: (profile: Omit<ProfileData, 'education'>) =>
    requestJson<Omit<ProfileData, 'education'>>('/api/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),

  // Projects
  saveProject: (project: ProjectData, isNew = false) =>
    requestJson<ProjectData>(
      isNew ? '/api/admin/projects' : `/api/admin/projects/${encodeURIComponent(project.id)}`,
      {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(project),
      }
    ),
  deleteProject: (id: string) =>
    requestJson<{ deleted: boolean }>(`/api/admin/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // Experience / Leadership / Achievements / Certifications
  saveExperience: (entry: ExperienceEntry, isNew = false) =>
    requestJson<ExperienceEntry>(
      isNew
        ? '/api/admin/experience'
        : `/api/admin/experience/${encodeURIComponent(entry.id)}`,
      {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(entry),
      }
    ),
  deleteExperience: (id: string) =>
    requestJson<{ deleted: boolean }>(`/api/admin/experience/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // Skills
  saveSkill: (skill: TechItem, isNew = false) =>
    requestJson<TechItem>(
      isNew ? '/api/admin/skills' : `/api/admin/skills/${encodeURIComponent(skill.id)}`,
      {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(skill),
      }
    ),
  deleteSkill: (id: string) =>
    requestJson<{ deleted: boolean }>(`/api/admin/skills/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // Education & Milestones
  saveEducation: (entry: EducationEntry, isNew = false) =>
    requestJson<EducationEntry>(
      isNew
        ? '/api/admin/education'
        : `/api/admin/education/${encodeURIComponent(entry.id)}`,
      {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(entry),
      }
    ),
  deleteEducation: (id: string) =>
    requestJson<{ deleted: boolean }>(`/api/admin/education/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  // Memories
  saveMemory: (memory: TechMemory, isNew = false) =>
    requestJson<TechMemory>(
      isNew ? '/api/admin/memories' : `/api/admin/memories/${encodeURIComponent(memory.id)}`,
      {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(memory),
      }
    ),
  deleteMemory: (id: string) =>
    requestJson<{ deleted: boolean }>(`/api/admin/memories/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
};
