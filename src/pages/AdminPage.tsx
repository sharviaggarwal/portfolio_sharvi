import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Briefcase,
  Camera,
  CheckCircle2,
  Cpu,
  Edit3,
  Eye,
  EyeOff,
  FileBadge,
  GraduationCap,
  Loader2,
  Lock,
  LogOut,
  Plus,
  Sparkles,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { portfolioApi } from '../lib/api';
import type {
  AccentTheme,
  EducationEntry,
  ExperienceCategory,
  ExperienceEntry,
  PortfolioSnapshot,
  ProfileData,
  ProjectData,
  TechItem,
  TechMemory,
} from '../types/portfolio';
import {
  ConfirmDeleteModal,
  FileUploadField,
  PreviewModal,
  StatusBadge,
} from '../components/admin/AdminSharedUI';
import { ProjectEditorModal } from '../components/admin/ProjectEditorModal';
import { ExperienceEditorModal } from '../components/admin/ExperienceEditorModal';
import { TechLogo } from '../components/graphics/TechLogos';

type AdminTab =
  | 'projects'
  | 'internships'
  | 'leadership'
  | 'achievements'
  | 'certifications'
  | 'skills'
  | 'education'
  | 'memories'
  | 'profile';

const ICON_OPTIONS = [
  'python', 'fastapi', 'postgresql', 'scikitlearn', 'evidently', 'langgraph',
  'langchain', 'ollama', 'chromadb', 'supabase', 'pandas', 'numpy', 'xgboost',
  'matplotlib', 'jupyter', 'vscode', 'git', 'github', 'c', 'cpp', 'sql',
  'transformers', 'ml', 'nlp', 'genai', 'llms', 'rag', 'embeddings',
  'search', 'prompt', 'agent', 'workflow', 'api',
];

export const AdminPage: React.FC = () => {
  const { refreshPortfolio } = usePortfolio();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('projects');
  const [data, setData] = useState<PortfolioSnapshot | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [toast, setToast] = useState<string>('');

  // Modal states
  const [editingProject, setEditingProject] = useState<{
    item: ProjectData;
    isNew: boolean;
  } | null>(null);
  const [editingExp, setEditingExp] = useState<{
    item: ExperienceEntry;
    isNew: boolean;
  } | null>(null);
  const [editingSkill, setEditingSkill] = useState<{
    item: TechItem;
    isNew: boolean;
  } | null>(null);
  const [editingEdu, setEditingEdu] = useState<{
    item: EducationEntry;
    isNew: boolean;
  } | null>(null);
  const [editingMemory, setEditingMemory] = useState<{
    item: TechMemory;
    isNew: boolean;
  } | null>(null);
  const [previewCard, setPreviewCard] = useState<{
    title: string;
    body: React.ReactNode;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState<Omit<ProfileData, 'education'> | null>(
    null
  );
  const [savingProfile, setSavingProfile] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const loadAdminData = useCallback(async () => {
    setLoadingData(true);
    try {
      const snap = await portfolioApi.getAdminPortfolio();
      setData(snap);
      const { education: _edu, ...meta } = snap.profile;
      setProfileForm(meta);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const session = await portfolioApi.getSession();
        if (session.authenticated && session.admin) {
          setAdminEmail(session.admin.email);
          await loadAdminData();
        }
      } catch {
        setAdminEmail(null);
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, [loadAdminData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await portfolioApi.login(loginEmail, loginPassword);
      setAdminEmail(res.admin.email);
      setLoginPassword('');
      await loadAdminData();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await portfolioApi.logout();
    setAdminEmail(null);
    setData(null);
  };

  const syncAll = async (message: string) => {
    await Promise.all([loadAdminData(), refreshPortfolio()]);
    showToast(message);
  };

  /* ------------------------------------------------------------------------ */
  /* Auth Loading / Private Login Gate                                        */
  /* ------------------------------------------------------------------------ */
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center p-6">
        <div className="flex items-center gap-3 font-mono text-sm text-ink">
          <Loader2 className="w-5 h-5 animate-spin text-maroon" />
          Verifying admin session...
        </div>
      </div>
    );
  }

  if (!adminEmail) {
    return (
      <main className="min-h-screen bg-charcoal bg-editorial-grid-dark text-white flex items-center justify-center p-5">
        <div className="w-full max-w-md rounded-[32px] bg-white text-ink p-8 shadow-2xl border border-ink/10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-maroon px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
              <Lock className="w-3 h-3" />
              PRIVATE ADMIN
            </span>
            <Link to="/" className="font-mono text-xs text-ink/60 hover:text-maroon">
              ← Portfolio
            </Link>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-ink">
              Portfolio Manager
            </h1>
            <p className="mt-1.5 text-sm text-ink/70">
              Sign in with your server-configured admin credentials to manage projects, experience, skills, and media.
            </p>
          </div>

          {loginError && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Admin Email
              </label>
              <input
                required
                type="email"
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-maroon focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Password
              </label>
              <input
                required
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-maroon focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white hover:bg-maroon py-3 font-display text-sm font-bold transition-colors disabled:opacity-60"
            >
              {loggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In to Admin Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Authenticated Admin Dashboard                                            */
  /* ------------------------------------------------------------------------ */
  const navTabs: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'projects', label: 'Projects', icon: <BookOpen className="w-4 h-4" />, count: data?.projects.length },
    {
      id: 'internships',
      label: 'Internships & Work',
      icon: <Briefcase className="w-4 h-4" />,
      count: data?.experience.filter((e) => e.category === 'Internship' || e.category === 'Program').length,
    },
    {
      id: 'leadership',
      label: 'Leadership',
      icon: <Users className="w-4 h-4" />,
      count: data?.experience.filter((e) => e.category === 'Leadership').length,
    },
    {
      id: 'achievements',
      label: 'Achievements & Awards',
      icon: <Award className="w-4 h-4" />,
      count: data?.experience.filter((e) => e.category === 'Achievement').length,
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <FileBadge className="w-4 h-4" />,
      count: data?.experience.filter((e) => e.category === 'Certification').length,
    },
    { id: 'skills', label: 'Technical Skills', icon: <Cpu className="w-4 h-4" />, count: data?.skills.length },
    {
      id: 'education',
      label: 'Education & Milestones',
      icon: <GraduationCap className="w-4 h-4" />,
      count: data?.profile.education.length,
    },
    { id: 'memories', label: 'Moving Memories', icon: <Camera className="w-4 h-4" />, count: data?.memories.length },
    { id: 'profile', label: 'Profile & Resume', icon: <UserCheck className="w-4 h-4" /> },
  ];

  const filteredExperienceForTab = (tab: AdminTab) => {
    if (!data) return [];
    if (tab === 'internships') {
      return data.experience.filter(
        (e) => e.category === 'Internship' || e.category === 'Program'
      );
    }
    if (tab === 'leadership') {
      return data.experience.filter((e) => e.category === 'Leadership');
    }
    if (tab === 'achievements') {
      return data.experience.filter((e) => e.category === 'Achievement');
    }
    if (tab === 'certifications') {
      return data.experience.filter((e) => e.category === 'Certification');
    }
    return [];
  };

  const defaultCategoryForTab = (tab: AdminTab): ExperienceCategory => {
    if (tab === 'leadership') return 'Leadership';
    if (tab === 'achievements') return 'Achievement';
    if (tab === 'certifications') return 'Certification';
    return 'Internship';
  };

  return (
    <div className="min-h-screen bg-offwhite text-ink">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-ink text-white border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-lime font-serif italic text-base">
              SA
            </span>
            <div>
              <h1 className="font-display text-base sm:text-lg font-bold">
                Private Portfolio Studio
              </h1>
              <p className="font-mono text-[11px] text-white/60">
                Signed in as {adminEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-lime text-ink px-4 py-1.5 font-display text-xs font-bold hover:bg-sky transition-colors"
            >
              View Live Site ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-maroon px-4 py-1.5 font-mono text-xs text-white border border-white/15 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-ink text-lime px-5 py-3 shadow-2xl border border-lime/30 font-mono text-xs">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-1.5">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-white text-ink/80 border border-ink/10 hover:border-maroon/40'
              }`}
            >
              <span className="flex items-center gap-2.5">
                {tab.icon}
                {tab.label}
              </span>
              {typeof tab.count === 'number' && (
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                    activeTab === tab.id
                      ? 'bg-lime text-ink font-bold'
                      : 'bg-offwhite text-ink/70'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
          {loadingData || !data ? (
            <div className="rounded-3xl bg-white p-10 border border-ink/10 flex items-center gap-3 font-mono text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-maroon" />
              Loading portfolio database...
            </div>
          ) : (
            <>
              {/* 1. PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Projects &amp; Case Studies</h2>
                      <p className="text-sm text-ink/70">
                        Automatically updates Project Lab and /projects/:slug pages.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          isNew: true,
                          item: {
                            id: '',
                            slug: '',
                            order: data.projects.length + 1,
                            kind: 'major',
                            categoryLabel: `PROJECT 0${data.projects.length + 1} · APPLIED AI`,
                            title: '',
                            subtitle: '',
                            summary: '',
                            detailedDescription: '',
                            stack: [],
                            features: [],
                            coverImage: '',
                            projectDate: '',
                            featured: false,
                            published: true,
                            metrics: [],
                            findings: [],
                            screenshots: [],
                            links: [],
                            accentTheme: 'sky',
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-maroon text-white hover:bg-ink px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="rounded-3xl bg-white p-5 border border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          {(proj.coverImage || proj.screenshots[0]?.src) && (
                            <img
                              src={proj.coverImage || proj.screenshots[0]?.src}
                              alt={proj.title}
                              className="w-20 h-14 rounded-xl object-cover bg-charcoal shrink-0"
                            />
                          )}
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <StatusBadge published={proj.published !== false} />
                              <span className="rounded-full bg-sky px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink">
                                {proj.kind}
                              </span>
                              {proj.featured && (
                                <span className="rounded-full bg-maroon px-2.5 py-0.5 font-mono text-[10px] uppercase text-lime">
                                  Featured
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-lg font-bold text-ink">
                              {proj.order}. {proj.title}
                            </h3>
                            <p className="text-xs text-ink/70">{proj.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              await portfolioApi.saveProject(
                                { ...proj, published: !(proj.published !== false) },
                                false
                              );
                              await syncAll(
                                proj.published !== false
                                  ? `${proj.title} moved to draft`
                                  : `${proj.title} published`
                              );
                            }}
                            className="rounded-full px-3 py-1.5 font-mono text-xs border border-ink/15 hover:bg-lime"
                          >
                            {proj.published !== false ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setPreviewCard({
                                title: proj.title,
                                body: (
                                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-ink/10">
                                    <p className="font-serif italic text-xl text-maroon">{proj.subtitle}</p>
                                    <p className="text-sm text-ink/80">{proj.summary}</p>
                                  </div>
                                ),
                              })
                            }
                            className="rounded-full p-2 border border-ink/15 hover:bg-sky"
                            aria-label="Preview project"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingProject({ item: proj, isNew: false })}
                            className="inline-flex items-center gap-1 rounded-full bg-offwhite px-3.5 py-1.5 font-mono text-xs border border-ink/15 hover:bg-ink hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                title: `Delete ${proj.title}?`,
                                description:
                                  'This permanently deletes this project from your database and removes it from Project Lab.',
                                onConfirm: async () => {
                                  await portfolioApi.deleteProject(proj.id);
                                  await syncAll(`Deleted ${proj.title}`);
                                },
                              })
                            }
                            className="rounded-full p-2 text-maroon hover:bg-red-50 border border-ink/10"
                            aria-label="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2–5. EXPERIENCE / LEADERSHIP / ACHIEVEMENTS / CERTIFICATIONS */}
              {(activeTab === 'internships' ||
                activeTab === 'leadership' ||
                activeTab === 'achievements' ||
                activeTab === 'certifications') && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold capitalize">
                        {navTabs.find((t) => t.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-ink/70">
                        Automatically updates the Experience, Leadership &amp; Achievements timeline.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingExp({
                          isNew: true,
                          item: {
                            id: '',
                            index: `0${data.experience.length + 1}`,
                            organization: '',
                            role: '',
                            period: '',
                            category: defaultCategoryForTab(activeTab),
                            summary: '',
                            details: [],
                            technologies: [],
                            supportingMedia: [],
                            links: [],
                            accent: 'lime',
                            published: true,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-maroon text-white hover:bg-ink px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Entry
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filteredExperienceForTab(activeTab).map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-3xl bg-white p-5 border border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <StatusBadge published={entry.published !== false} />
                            <span className="rounded-full bg-sky px-2.5 py-0.5 font-mono text-[10px] uppercase text-ink">
                              {entry.category}
                            </span>
                            <span className="font-mono text-xs text-ink/60">
                              {entry.period}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink">
                            {entry.organization}{' '}
                            <span className="font-serif italic text-maroon font-normal">
                              — {entry.role}
                            </span>
                          </h3>
                          <p className="text-xs text-ink/75 mt-1">{entry.summary}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              await portfolioApi.saveExperience(
                                { ...entry, published: !(entry.published !== false) },
                                false
                              );
                              await syncAll('Updated publish status');
                            }}
                            className="rounded-full px-3 py-1.5 font-mono text-xs border border-ink/15 hover:bg-lime"
                          >
                            {entry.published !== false ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingExp({ item: entry, isNew: false })}
                            className="inline-flex items-center gap-1 rounded-full bg-offwhite px-3.5 py-1.5 font-mono text-xs border border-ink/15 hover:bg-ink hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                title: `Delete ${entry.organization}?`,
                                description:
                                  'This removes the entry permanently from your timeline.',
                                onConfirm: async () => {
                                  await portfolioApi.deleteExperience(entry.id);
                                  await syncAll(`Deleted ${entry.organization}`);
                                },
                              })
                            }
                            className="rounded-full p-2 text-maroon hover:bg-red-50 border border-ink/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. TECHNICAL SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold">Technical Skills</h2>
                      <p className="text-sm text-ink/70">
                        Updates My Tech World categories, ticker, and project filters.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingSkill({
                          isNew: true,
                          item: {
                            id: '',
                            name: '',
                            iconKey: 'python',
                            categoryId: data.techCategories[0]?.id || 'ai-ml',
                            projectIds: [],
                            isSharedToolkit: true,
                            published: true,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-maroon text-white hover:bg-ink px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="rounded-2xl bg-white p-4 border border-ink/10 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <TechLogo iconKey={skill.iconKey} className="w-6 h-6 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-sm">
                                {skill.name}
                              </span>
                              <StatusBadge published={skill.published !== false} />
                            </div>
                            <span className="font-mono text-[10px] uppercase text-ink/60">
                              {data.techCategories.find((c) => c.id === skill.categoryId)?.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={async () => {
                              await portfolioApi.saveSkill(
                                { ...skill, published: !(skill.published !== false) },
                                false
                              );
                              await syncAll('Updated skill visibility');
                            }}
                            className="p-1.5 rounded-full border border-ink/10 hover:bg-lime"
                            title={skill.published !== false ? 'Unpublish' : 'Publish'}
                          >
                            {skill.published !== false ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingSkill({ item: skill, isNew: false })}
                            className="p-1.5 rounded-full border border-ink/10 hover:bg-sky"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                title: `Delete ${skill.name}?`,
                                description: 'Removes this technology from My Tech World.',
                                onConfirm: async () => {
                                  await portfolioApi.deleteSkill(skill.id);
                                  await syncAll(`Deleted ${skill.name}`);
                                },
                              })
                            }
                            className="p-1.5 rounded-full border border-ink/10 text-maroon hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. EDUCATION & MILESTONES TAB */}
              {activeTab === 'education' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        Education &amp; Milestones
                      </h2>
                      <p className="text-sm text-ink/70">
                        Automatically updates the Homepage badge and About Me education cards.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingEdu({
                          isNew: true,
                          item: {
                            id: '',
                            institution: '',
                            location: '',
                            degree: '',
                            minor: '',
                            period: '',
                            cgpa: '',
                            description: '',
                            milestones: [],
                            published: true,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-maroon text-white hover:bg-ink px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education / Milestone
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.profile.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="rounded-3xl bg-white p-5 border border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <StatusBadge published={edu.published !== false} />
                            <span className="font-mono text-xs text-ink/60">{edu.period}</span>
                            <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] font-bold">
                              {edu.cgpa}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink">
                            {edu.institution}
                          </h3>
                          <p className="text-xs text-ink/75">
                            {edu.degree} {edu.minor ? `· ${edu.minor}` : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingEdu({ item: edu, isNew: false })}
                            className="inline-flex items-center gap-1 rounded-full bg-offwhite px-3.5 py-1.5 font-mono text-xs border border-ink/15 hover:bg-ink hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                title: `Delete ${edu.institution}?`,
                                description: 'Removes this education milestone.',
                                onConfirm: async () => {
                                  await portfolioApi.deleteEducation(edu.id);
                                  await syncAll('Deleted education entry');
                                },
                              })
                            }
                            className="rounded-full p-2 text-maroon hover:bg-red-50 border border-ink/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. MOVING MEMORIES TAB */}
              {activeTab === 'memories' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        Moving Memories Reel
                      </h2>
                      <p className="text-sm text-ink/70">
                        Upload or manage polaroids in the Tech World Moving Memories reel.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMemory({
                          isNew: true,
                          item: {
                            id: '',
                            src: '',
                            alt: '',
                            caption: '',
                            tag: 'Milestone',
                            accent: 'lime',
                            published: true,
                          },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-maroon text-white hover:bg-ink px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4" />
                      Add Memory Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.memories.map((mem) => (
                      <div
                        key={mem.id}
                        className="rounded-3xl bg-white p-3.5 border border-ink/10 space-y-3"
                      >
                        <img
                          src={mem.src}
                          alt={mem.alt}
                          className="w-full h-40 object-cover rounded-2xl bg-charcoal"
                        />
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="font-display text-sm font-bold">{mem.caption}</p>
                            <span className="font-mono text-[10px] text-maroon uppercase">
                              {mem.tag}
                            </span>
                          </div>
                          <StatusBadge published={mem.published !== false} />
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-1 border-t border-ink/10">
                          <button
                            type="button"
                            onClick={() => setEditingMemory({ item: mem, isNew: false })}
                            className="rounded-full px-3 py-1 font-mono text-xs border border-ink/15 hover:bg-sky"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                title: `Delete ${mem.caption}?`,
                                description: 'Removes this photo from Moving Memories.',
                                onConfirm: async () => {
                                  await portfolioApi.deleteMemory(mem.id);
                                  await syncAll('Deleted memory');
                                },
                              })
                            }
                            className="rounded-full p-1.5 text-maroon hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. PROFILE & RESUME PDF TAB */}
              {activeTab === 'profile' && profileForm && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSavingProfile(true);
                    try {
                      await portfolioApi.updateProfile(profileForm);
                      await syncAll('Profile & Resume updated');
                    } finally {
                      setSavingProfile(false);
                    }
                  }}
                  className="rounded-3xl bg-white p-6 sm:p-8 border border-ink/10 space-y-5"
                >
                  <div>
                    <h2 className="font-display text-2xl font-bold">
                      Profile, Portrait &amp; Resume PDF
                    </h2>
                    <p className="text-sm text-ink/70">
                      Upload a new resume PDF or update hero details persistently.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                        Name
                      </label>
                      <input
                        required
                        type="text"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                        Role Tagline
                      </label>
                      <input
                        required
                        type="text"
                        value={profileForm.role}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, role: e.target.value })
                        }
                        className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                      Opening Greeting
                    </label>
                    <input
                      required
                      type="text"
                      value={profileForm.openingGreeting}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          openingGreeting: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                      Personality Intro
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={profileForm.personalityIntro}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          personalityIntro: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                    />
                  </div>

                  <FileUploadField
                    label="Resume PDF (Persistent Upload)"
                    value={profileForm.resumePdfSrc}
                    onChange={(url) =>
                      setProfileForm({ ...profileForm, resumePdfSrc: url })
                    }
                    accept="application/pdf"
                    helper="Upload a new PDF to immediately update the navbar Resume button."
                  />

                  <FileUploadField
                    label="Personal Portrait Image"
                    value={profileForm.portraitSrc}
                    onChange={(url) =>
                      setProfileForm({ ...profileForm, portraitSrc: url })
                    }
                    accept="image/png,image/jpeg,image/webp"
                  />

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="inline-flex items-center gap-2 rounded-full bg-ink text-white hover:bg-maroon px-6 py-3 font-display text-xs font-bold uppercase tracking-wider"
                  >
                    {savingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                    <Sparkles className="w-4 h-4 text-lime" />
                    Save Profile &amp; Resume
                  </button>
                </form>
              )}
            </>
          )}
        </main>
      </div>

      {/* Project Add/Edit Modal */}
      {editingProject && (
        <ProjectEditorModal
          initial={editingProject.item}
          isNew={editingProject.isNew}
          onClose={() => setEditingProject(null)}
          onSave={async (proj, isNew) => {
            await portfolioApi.saveProject(proj, isNew);
            await syncAll(isNew ? `Added project "${proj.title}"` : `Saved "${proj.title}"`);
          }}
        />
      )}

      {/* Experience / Leadership / Achievement / Certification Add/Edit Modal */}
      {editingExp && (
        <ExperienceEditorModal
          initial={editingExp.item}
          isNew={editingExp.isNew}
          onClose={() => setEditingExp(null)}
          onSave={async (entry, isNew) => {
            await portfolioApi.saveExperience(entry, isNew);
            await syncAll(
              isNew ? `Added "${entry.organization}"` : `Saved "${entry.organization}"`
            );
          }}
        />
      )}

      {/* Skill Add/Edit Modal */}
      {editingSkill && data && (
        <SkillModal
          initial={editingSkill.item}
          isNew={editingSkill.isNew}
          categories={data.techCategories}
          projects={data.projects}
          onClose={() => setEditingSkill(null)}
          onSave={async (skill, isNew) => {
            await portfolioApi.saveSkill(skill, isNew);
            await syncAll(isNew ? `Added skill "${skill.name}"` : `Saved "${skill.name}"`);
          }}
        />
      )}

      {/* Education Add/Edit Modal */}
      {editingEdu && (
        <EducationModal
          initial={editingEdu.item}
          isNew={editingEdu.isNew}
          onClose={() => setEditingEdu(null)}
          onSave={async (edu, isNew) => {
            await portfolioApi.saveEducation(edu, isNew);
            await syncAll(
              isNew ? `Added "${edu.institution}"` : `Saved "${edu.institution}"`
            );
          }}
        />
      )}

      {/* Moving Memory Add/Edit Modal */}
      {editingMemory && (
        <MemoryModal
          initial={editingMemory.item}
          isNew={editingMemory.isNew}
          onClose={() => setEditingMemory(null)}
          onSave={async (mem, isNew) => {
            await portfolioApi.saveMemory(mem, isNew);
            await syncAll(isNew ? `Added "${mem.caption}"` : `Saved "${mem.caption}"`);
          }}
        />
      )}

      {/* Generic Preview Modal */}
      <PreviewModal
        open={Boolean(previewCard)}
        title={previewCard?.title || 'Preview'}
        onClose={() => setPreviewCard(null)}
      >
        {previewCard?.body}
      </PreviewModal>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title={deleteTarget?.title || ''}
        description={deleteTarget?.description || ''}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          setDeleting(true);
          try {
            await deleteTarget.onConfirm();
            setDeleteTarget(null);
          } finally {
            setDeleting(false);
          }
        }}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Compact Inline Modals for Skills, Education & Memories                     */
/* -------------------------------------------------------------------------- */
const SkillModal: React.FC<{
  initial: TechItem;
  isNew: boolean;
  categories: PortfolioSnapshot['techCategories'];
  projects: ProjectData[];
  onClose: () => void;
  onSave: (skill: TechItem, isNew: boolean) => Promise<void>;
}> = ({ initial, isNew, categories, projects, onClose, onSave }) => {
  const [form, setForm] = useState<TechItem>({
    ...initial,
    projectIds: initial.projectIds || [],
    published: initial.published !== false,
  });
  const [saving, setSaving] = useState(false);

  const toggleProject = (pid: string) => {
    const current = form.projectIds || [];
    const next = current.includes(pid)
      ? current.filter((x) => x !== pid)
      : [...current, pid];
    setForm({ ...form, projectIds: next });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          try {
            const id = isNew
              ? `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`
              : form.id;
            await onSave({ ...form, id }, isNew);
            onClose();
          } finally {
            setSaving(false);
          }
        }}
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl space-y-4"
      >
        <h3 className="font-display text-xl font-bold">
          {isNew ? 'Add Technical Skill' : `Edit ${initial.name}`}
        </h3>

        <div>
          <label className="block font-mono text-[11px] uppercase mb-1">Skill Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[11px] uppercase mb-1">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase mb-1">Logo Icon</label>
            <select
              value={form.iconKey}
              onChange={(e) => setForm({ ...form, iconKey: e.target.value })}
              className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm bg-white"
            >
              {ICON_OPTIONS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase mb-1.5">
            Established Project Connections
          </label>
          <div className="flex flex-wrap gap-2">
            {projects.map((p) => {
              const checked = (form.projectIds || []).includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleProject(p.id)}
                  className={`rounded-full px-3 py-1 font-mono text-xs border ${
                    checked ? 'bg-lime border-ink font-semibold' : 'bg-offwhite border-ink/15'
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-5 pt-1">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(form.isSharedToolkit)}
              onChange={(e) => setForm({ ...form, isSharedToolkit: e.target.checked })}
              className="accent-maroon"
            />
            Shared General Toolkit
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published !== false}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="accent-maroon"
            />
            Published
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-xs font-semibold border border-ink/15"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-ink text-white hover:bg-maroon px-5 py-2 text-xs font-bold"
          >
            {saving ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </form>
    </div>
  );
};

const EducationModal: React.FC<{
  initial: EducationEntry;
  isNew: boolean;
  onClose: () => void;
  onSave: (edu: EducationEntry, isNew: boolean) => Promise<void>;
}> = ({ initial, isNew, onClose, onSave }) => {
  const [form, setForm] = useState<EducationEntry>({
    ...initial,
    published: initial.published !== false,
  });
  const [saving, setSaving] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          try {
            const id = isNew
              ? `edu-${Date.now().toString(36)}`
              : form.id;
            await onSave({ ...form, id }, isNew);
            onClose();
          } finally {
            setSaving(false);
          }
        }}
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl space-y-4"
      >
        <h3 className="font-display text-xl font-bold">
          {isNew ? 'Add Education / Milestone' : `Edit ${initial.institution}`}
        </h3>

        <input
          required
          type="text"
          placeholder="Institution *"
          value={form.institution}
          onChange={(e) => setForm({ ...form, institution: e.target.value })}
          className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="text"
            placeholder="Degree / Milestone *"
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Minor (optional)"
            value={form.minor || ''}
            onChange={(e) => setForm({ ...form, minor: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input
            required
            type="text"
            placeholder="Location *"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
          <input
            required
            type="text"
            placeholder="Period *"
            value={form.period}
            onChange={(e) => setForm({ ...form, period: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
          <input
            required
            type="text"
            placeholder="CGPA / Score *"
            value={form.cgpa}
            onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
        </div>
        <textarea
          rows={2}
          placeholder="Notes / milestones (optional)"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
        />

        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published !== false}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="accent-maroon"
          />
          Published
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-xs font-semibold border border-ink/15"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-ink text-white hover:bg-maroon px-5 py-2 text-xs font-bold"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

const MemoryModal: React.FC<{
  initial: TechMemory;
  isNew: boolean;
  onClose: () => void;
  onSave: (mem: TechMemory, isNew: boolean) => Promise<void>;
}> = ({ initial, isNew, onClose, onSave }) => {
  const [form, setForm] = useState<TechMemory>({
    ...initial,
    published: initial.published !== false,
  });
  const [saving, setSaving] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setSaving(true);
          try {
            const id = isNew ? `mem-${Date.now().toString(36)}` : form.id;
            await onSave({ ...form, id }, isNew);
            onClose();
          } finally {
            setSaving(false);
          }
        }}
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl space-y-4"
      >
        <h3 className="font-display text-xl font-bold">
          {isNew ? 'Add Moving Memory Photo' : `Edit ${initial.caption}`}
        </h3>

        <FileUploadField
          label="Memory Photo *"
          value={form.src}
          onChange={(url) => setForm({ ...form, src: url })}
          accept="image/png,image/jpeg,image/webp"
        />

        <input
          required
          type="text"
          placeholder="Short Caption *"
          value={form.caption}
          onChange={(e) => setForm({ ...form, caption: e.target.value })}
          className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
        />
        <input
          required
          type="text"
          placeholder="Accessible Alt Text *"
          value={form.alt}
          onChange={(e) => setForm({ ...form, alt: e.target.value })}
          className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            required
            type="text"
            placeholder="Tag (e.g. Leadership) *"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
          />
          <select
            value={form.accent}
            onChange={(e) =>
              setForm({ ...form, accent: e.target.value as AccentTheme })
            }
            className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm bg-white"
          >
            <option value="lime">Lime</option>
            <option value="sky">Sky Blue</option>
            <option value="maroon">Maroon</option>
          </select>
        </div>

        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published !== false}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="accent-maroon"
          />
          Published
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-xs font-semibold border border-ink/15"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-ink text-white hover:bg-maroon px-5 py-2 text-xs font-bold"
          >
            {saving ? 'Saving...' : 'Save Memory'}
          </button>
        </div>
      </form>
    </div>
  );
};
