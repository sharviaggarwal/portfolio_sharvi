import React, { useState } from 'react';
import { Eye, Loader2, Plus, Trash2, Upload, X } from 'lucide-react';
import { portfolioApi } from '../../lib/api';
import type { AccentTheme, ProjectData } from '../../types/portfolio';
import { FileUploadField, PreviewModal } from './AdminSharedUI';

interface ProjectEditorModalProps {
  initial: ProjectData;
  isNew: boolean;
  onClose: () => void;
  onSave: (project: ProjectData, isNew: boolean) => Promise<void>;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  initial,
  isNew,
  onClose,
  onSave,
}) => {
  const existingGithub =
    initial.links.find((l) => l.kind === 'github')?.url || '';
  const existingLive =
    initial.links.find((l) => l.kind === 'live')?.url || '';

  const [form, setForm] = useState<ProjectData>({
    ...initial,
    published: initial.published !== false,
    featured: Boolean(initial.featured),
    coverImage: initial.coverImage || '',
    projectDate: initial.projectDate || '',
    detailedDescription: initial.detailedDescription || '',
    metrics: initial.metrics || [],
    findings: initial.findings || [],
    screenshots: initial.screenshots || [],
    caseStudy: initial.caseStudy || {
      bigIdea: '',
      problem: '',
      engineeringApproach: [],
      architectureSummary: '',
      workflowSteps: [],
      resultsAndLearnings: [],
    },
  });

  const [stackInput, setStackInput] = useState(initial.stack.join(', '));
  const [featuresInput, setFeaturesInput] = useState(initial.features.join('\n'));
  const [approachInput, setApproachInput] = useState(
    (initial.caseStudy?.engineeringApproach || []).join('\n')
  );
  const [resultsInput, setResultsInput] = useState(
    (initial.caseStudy?.resultsAndLearnings || []).join('\n')
  );
  const [githubUrl, setGithubUrl] = useState(existingGithub);
  const [liveDemoUrl, setLiveDemoUrl] = useState(existingLive);
  const [uploadingShots, setUploadingShots] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const buildPayload = (): ProjectData => {
    const cleanTitle = form.title.trim();
    const cleanSlug = slugify(form.slug || cleanTitle) || `project-${Date.now()}`;
    const cleanId = isNew ? cleanSlug : form.id;

    const preservedOtherLinks = form.links.filter(
      (l) => l.kind !== 'github' && l.kind !== 'live'
    );
    const nextLinks = [...preservedOtherLinks];
    if (githubUrl.trim()) {
      nextLinks.push({ label: 'GitHub', url: githubUrl.trim(), kind: 'github' });
    }
    if (liveDemoUrl.trim()) {
      nextLinks.push({ label: 'Live Demo', url: liveDemoUrl.trim(), kind: 'live' });
    }

    const cs = form.caseStudy;
    const approach = approachInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const results = resultsInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const hasCaseStudy =
      Boolean(cs?.bigIdea.trim()) ||
      Boolean(cs?.problem.trim()) ||
      Boolean(cs?.architectureSummary.trim()) ||
      approach.length > 0 ||
      results.length > 0 ||
      (cs?.workflowSteps?.length || 0) > 0;

    return {
      ...form,
      id: cleanId,
      slug: cleanSlug,
      title: cleanTitle,
      stack: stackInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      features: featuresInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      links: nextLinks,
      caseStudy: hasCaseStudy
        ? {
            bigIdea: cs?.bigIdea || form.summary,
            problem: cs?.problem || '',
            engineeringApproach: approach,
            architectureSummary: cs?.architectureSummary || '',
            workflowSteps: cs?.workflowSteps || [],
            resultsAndLearnings: results,
          }
        : undefined,
    };
  };

  const handleMultiScreenshotUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingShots(true);
    setError('');
    try {
      const uploaded: ProjectData['screenshots'] = [];
      for (const file of files) {
        const res = await portfolioApi.uploadFile(file);
        uploaded.push({
          id: `shot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          src: res.url,
          alt: `${form.title || 'Project'} screenshot`,
          caption: file.name.replace(/\.[^.]+$/, ''),
          tag: 'Screenshot',
        });
      }
      setForm((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, ...uploaded],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Screenshot upload failed');
    } finally {
      setUploadingShots(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      await onSave(payload, isNew);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const previewData = buildPayload();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[28px] bg-offwhite p-6 sm:p-8 shadow-2xl border border-ink/15">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
              {isNew ? 'ADD NEW PROJECT' : `EDIT PROJECT · ${initial.title}`}
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">
              {isNew ? 'Create Project & Case Study' : initial.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white p-2 border border-ink/15 hover:bg-lime"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Core Metadata */}
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <h3 className="font-display text-base font-bold text-ink">
              Basic Details &amp; Visibility
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Project Title *
                </label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    const nextTitle = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      title: nextTitle,
                      slug: isNew ? slugify(nextTitle) : prev.slug,
                    }));
                  }}
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  URL Slug *
                </label>
                <input
                  required
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Subtitle *
                </label>
                <input
                  required
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Project Category *
                </label>
                <input
                  required
                  type="text"
                  value={form.categoryLabel}
                  onChange={(e) =>
                    setForm({ ...form, categoryLabel: e.target.value })
                  }
                  placeholder="PROJECT 06 · APPLIED AI"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Project Date
                </label>
                <input
                  type="text"
                  value={form.projectDate || ''}
                  onChange={(e) => setForm({ ...form, projectDate: e.target.value })}
                  placeholder="e.g. Nov 2026"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                    Layout
                  </label>
                  <select
                    value={form.kind}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kind: e.target.value as ProjectData['kind'],
                      })
                    }
                    className="w-full rounded-xl border border-ink/15 px-2.5 py-2 text-sm bg-white"
                  >
                    <option value="flagship">Flagship</option>
                    <option value="major">Major</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                    Accent
                  </label>
                  <select
                    value={form.accentTheme}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        accentTheme: e.target.value as AccentTheme,
                      })
                    }
                    className="w-full rounded-xl border border-ink/15 px-2.5 py-2 text-sm bg-white"
                  >
                    <option value="lime">Lime</option>
                    <option value="sky">Sky Blue</option>
                    <option value="maroon">Maroon</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: Number(e.target.value) || 1 })
                    }
                    className="w-full rounded-xl border border-ink/15 px-2.5 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(form.featured)}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 accent-maroon"
                />
                Featured Project
              </label>

              <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published !== false}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 accent-maroon"
                />
                Published on Live Portfolio
              </label>
            </div>
          </div>

          {/* Descriptions & Tech Stack */}
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <h3 className="font-display text-base font-bold text-ink">
              Descriptions &amp; Technologies
            </h3>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Detailed Description
              </label>
              <textarea
                rows={3}
                value={form.detailedDescription || ''}
                onChange={(e) =>
                  setForm({ ...form, detailedDescription: e.target.value })
                }
                placeholder="Extended context shown on the project case study..."
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Technologies Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Python, FastAPI, LangGraph"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Key Features (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/sharviaggarwal/..."
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Cover Image & Multiple Screenshots */}
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-bold text-ink">
                Cover Image &amp; Screenshots
              </h3>
              <label className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 font-mono text-xs font-semibold text-ink border border-ink/15 cursor-pointer hover:bg-sky">
                {uploadingShots ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                Add Screenshots (Multi-upload)
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleMultiScreenshotUpload}
                  className="hidden"
                />
              </label>
            </div>

            <FileUploadField
              label="Project Cover Image"
              value={form.coverImage || ''}
              onChange={(url) => setForm({ ...form, coverImage: url })}
              accept="image/png,image/jpeg,image/webp,image/gif"
            />

            {form.screenshots.length > 0 && (
              <div className="space-y-3 pt-2">
                {form.screenshots.map((shot, idx) => (
                  <div
                    key={shot.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center rounded-2xl bg-offwhite p-3 border border-ink/10"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="sm:col-span-3 h-20 w-full rounded-xl object-cover bg-charcoal"
                    />
                    <div className="sm:col-span-8 space-y-2">
                      <input
                        type="text"
                        value={shot.caption}
                        onChange={(e) => {
                          const next = [...form.screenshots];
                          next[idx] = { ...shot, caption: e.target.value };
                          setForm({ ...form, screenshots: next });
                        }}
                        placeholder="Caption"
                        className="w-full rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={shot.tag}
                          onChange={(e) => {
                            const next = [...form.screenshots];
                            next[idx] = { ...shot, tag: e.target.value };
                            setForm({ ...form, screenshots: next });
                          }}
                          placeholder="Tag (e.g. Dashboard)"
                          className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          value={shot.alt}
                          onChange={(e) => {
                            const next = [...form.screenshots];
                            next[idx] = { ...shot, alt: e.target.value };
                            setForm({ ...form, screenshots: next });
                          }}
                          placeholder="Alt text"
                          className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          screenshots: form.screenshots.filter((_, i) => i !== idx),
                        })
                      }
                      className="sm:col-span-1 justify-self-end rounded-full p-2 text-maroon hover:bg-white"
                      aria-label="Remove screenshot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Case Study & Metrics */}
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <h3 className="font-display text-base font-bold text-ink">
              Case Study, Architecture &amp; Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Big Idea
                </label>
                <textarea
                  rows={2}
                  value={form.caseStudy?.bigIdea || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      caseStudy: { ...form.caseStudy!, bigIdea: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Problem Statement
                </label>
                <textarea
                  rows={2}
                  value={form.caseStudy?.problem || ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      caseStudy: { ...form.caseStudy!, problem: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Engineering Approach (one step per line)
              </label>
              <textarea
                rows={3}
                value={approachInput}
                onChange={(e) => setApproachInput(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Architecture / Workflow Summary
              </label>
              <textarea
                rows={2}
                value={form.caseStudy?.architectureSummary || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    caseStudy: {
                      ...form.caseStudy!,
                      architectureSummary: e.target.value,
                    },
                  })
                }
                placeholder="Input -> Processing -> Vector DB -> Response"
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold">
                  Results &amp; Metrics
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      metrics: [
                        ...(form.metrics || []),
                        { label: '', value: '', note: '' },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-offwhite px-3 py-1 font-mono text-[11px] border border-ink/15 hover:bg-lime"
                >
                  <Plus className="w-3 h-3" /> Add Metric
                </button>
              </div>
              {(form.metrics || []).map((metric, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={metric.label}
                    onChange={(e) => {
                      const next = [...(form.metrics || [])];
                      next[idx] = { ...metric, label: e.target.value };
                      setForm({ ...form, metrics: next });
                    }}
                    placeholder="Metric (e.g. Accuracy)"
                    className="sm:col-span-4 rounded-xl border border-ink/15 px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => {
                      const next = [...(form.metrics || [])];
                      next[idx] = { ...metric, value: e.target.value };
                      setForm({ ...form, metrics: next });
                    }}
                    placeholder="Value (e.g. 92.4%)"
                    className="sm:col-span-3 rounded-xl border border-ink/15 px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    value={metric.note || ''}
                    onChange={(e) => {
                      const next = [...(form.metrics || [])];
                      next[idx] = { ...metric, note: e.target.value };
                      setForm({ ...form, metrics: next });
                    }}
                    placeholder="Optional note"
                    className="sm:col-span-4 rounded-xl border border-ink/15 px-3 py-1.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        metrics: (form.metrics || []).filter((_, i) => i !== idx),
                      })
                    }
                    className="sm:col-span-1 justify-self-end p-1.5 text-maroon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Results &amp; Learnings (one per line)
              </label>
              <textarea
                rows={3}
                value={resultsInput}
                onChange={(e) => setResultsInput(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-ink/15 hover:bg-sky"
            >
              <Eye className="w-4 h-4" />
              Preview Before Publishing
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-xs font-semibold border border-ink/15 bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-white hover:bg-maroon px-6 py-2.5 text-xs font-bold uppercase tracking-wider disabled:opacity-60"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Project
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Live Card Preview */}
      <PreviewModal
        open={previewOpen}
        title={previewData.title || 'Project Preview'}
        onClose={() => setPreviewOpen(false)}
      >
        <div className="rounded-[28px] bg-white p-6 border border-ink/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase text-ink">
              {previewData.categoryLabel}
              {previewData.projectDate ? ` · ${previewData.projectDate}` : ''}
            </span>
            {previewData.featured && (
              <span className="rounded-full bg-maroon px-3 py-1 font-mono text-[10px] uppercase text-lime">
                Featured
              </span>
            )}
          </div>
          {(previewData.coverImage || previewData.screenshots[0]?.src) && (
            <img
              src={previewData.coverImage || previewData.screenshots[0]?.src}
              alt={previewData.title}
              className="w-full h-56 object-cover rounded-2xl bg-charcoal"
            />
          )}
          <h4 className="font-display text-3xl font-bold text-ink">
            {previewData.title}
          </h4>
          <p className="font-serif italic text-xl text-maroon">
            {previewData.subtitle}
          </p>
          <p className="text-sm text-ink/80 leading-relaxed">
            {previewData.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {previewData.stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-offwhite px-3 py-1 font-mono text-xs border border-ink/10"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </PreviewModal>
    </div>
  );
};
