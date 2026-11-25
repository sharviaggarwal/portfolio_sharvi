import React, { useState } from 'react';
import { Eye, Loader2, Plus, Trash2, Upload, X } from 'lucide-react';
import { portfolioApi } from '../../lib/api';
import type {
  AccentTheme,
  ExperienceCategory,
  ExperienceEntry,
  SupportingMediaItem,
} from '../../types/portfolio';
import { PreviewModal } from './AdminSharedUI';

interface ExperienceEditorModalProps {
  initial: ExperienceEntry;
  isNew: boolean;
  onClose: () => void;
  onSave: (entry: ExperienceEntry, isNew: boolean) => Promise<void>;
}

function slugId(prefix: string) {
  return `${prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
}

export const ExperienceEditorModal: React.FC<ExperienceEditorModalProps> = ({
  initial,
  isNew,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<ExperienceEntry>({
    ...initial,
    published: initial.published !== false,
    technologies: initial.technologies || [],
    supportingMedia: initial.supportingMedia || [],
    links: initial.links || [],
  });

  const [detailsText, setDetailsText] = useState(initial.details.join('\n'));
  const [techText, setTechText] = useState((initial.technologies || []).join(', '));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const isAwardOrCert =
    form.category === 'Achievement' || form.category === 'Certification';

  const buildPayload = (): ExperienceEntry => ({
    ...form,
    id: isNew ? slugId(form.organization || form.role || 'entry') : form.id,
    details: detailsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    technologies: techText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  });

  const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await portfolioApi.uploadFile(file);
      const isPdf = res.mimeType === 'application/pdf';
      const nextItem: SupportingMediaItem = {
        id: `media-${Date.now()}`,
        label: res.originalName.replace(/\.[^.]+$/, ''),
        url: res.url,
        kind: isPdf ? 'document' : 'image',
      };
      setForm((prev) => ({
        ...prev,
        supportingMedia: [...(prev.supportingMedia || []), nextItem],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(buildPayload(), isNew);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save entry');
    } finally {
      setSaving(false);
    }
  };

  const previewData = buildPayload();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[28px] bg-offwhite p-6 sm:p-8 shadow-2xl border border-ink/15">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-ink/10">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon font-semibold">
              {isNew ? `ADD ${form.category.toUpperCase()}` : `EDIT · ${initial.organization}`}
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">
              {isAwardOrCert ? 'Achievement / Certification Details' : 'Experience & Leadership Details'}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as ExperienceCategory,
                    })
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm bg-white"
                >
                  <option value="Internship">Internship / Work</option>
                  <option value="Leadership">Leadership Position</option>
                  <option value="Program">Program</option>
                  <option value="Achievement">Achievement / Award</option>
                  <option value="Certification">Certification</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Timeline Index *
                </label>
                <input
                  required
                  type="text"
                  value={form.index}
                  onChange={(e) => setForm({ ...form, index: e.target.value })}
                  placeholder="06"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  {isAwardOrCert ? 'Achievement / Certificate Title *' : 'Company / Organization *'}
                </label>
                <input
                  required
                  type="text"
                  value={form.organization}
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  {isAwardOrCert ? 'Issuing Organization / Outcome *' : 'Role / Position *'}
                </label>
                <input
                  required
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  {isAwardOrCert ? 'Date *' : 'Duration *'}
                </label>
                <input
                  required
                  type="text"
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  placeholder="Summer 2026 / Nov 2026"
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                  Badge Accent
                </label>
                <select
                  value={form.accent}
                  onChange={(e) =>
                    setForm({ ...form, accent: e.target.value as AccentTheme })
                  }
                  className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm bg-white"
                >
                  <option value="sky">Sky Blue</option>
                  <option value="lime">Light Lime</option>
                  <option value="maroon">Deep Maroon</option>
                  <option value="ink">Ink Black</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Short Description *
              </label>
              <textarea
                required
                rows={2}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                {isAwardOrCert
                  ? 'Extended Description / Notes (one per line)'
                  : 'Responsibilities & Details (one per line)'}
              </label>
              <textarea
                rows={3}
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={techText}
                onChange={(e) => setTechText(e.target.value)}
                placeholder="Python, FastAPI, SPI Protocol"
                className="w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm"
              />
            </div>

            <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={form.published !== false}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 accent-maroon"
              />
              Published on Live Portfolio
            </label>
          </div>

          {/* Supporting Images / Certificates / Documents */}
          <div className="rounded-2xl bg-white p-5 border border-ink/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-bold text-ink">
                Certificates, Supporting Images &amp; Documents
              </h3>
              <label className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 font-mono text-xs font-semibold text-ink border border-ink/15 cursor-pointer hover:bg-sky">
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                Upload Image or PDF
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
                  onChange={handleUploadMedia}
                  className="hidden"
                />
              </label>
            </div>

            {(form.supportingMedia || []).map((media, idx) => (
              <div
                key={media.id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-offwhite p-2.5 border border-ink/10"
              >
                <input
                  type="text"
                  value={media.label}
                  onChange={(e) => {
                    const next = [...(form.supportingMedia || [])];
                    next[idx] = { ...media, label: e.target.value };
                    setForm({ ...form, supportingMedia: next });
                  }}
                  placeholder="Label"
                  className="flex-1 min-w-[140px] rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-xs"
                />
                <span className="font-mono text-[11px] text-ink/60 truncate max-w-[200px]">
                  {media.url}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      supportingMedia: (form.supportingMedia || []).filter(
                        (_, i) => i !== idx
                      ),
                    })
                  }
                  className="p-1.5 text-maroon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Relevant Links */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold">
                  Relevant Links
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      links: [...(form.links || []), { label: '', url: '' }],
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-offwhite px-3 py-1 font-mono text-[11px] border border-ink/15 hover:bg-lime"
                >
                  <Plus className="w-3 h-3" /> Add Link
                </button>
              </div>
              {(form.links || []).map((link, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const next = [...(form.links || [])];
                      next[idx] = { ...link, label: e.target.value };
                      setForm({ ...form, links: next });
                    }}
                    placeholder="Link label (e.g. Credential)"
                    className="sm:col-span-4 rounded-xl border border-ink/15 px-3 py-1.5 text-xs"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const next = [...(form.links || [])];
                      next[idx] = { ...link, url: e.target.value };
                      setForm({ ...form, links: next });
                    }}
                    placeholder="https://..."
                    className="sm:col-span-7 rounded-xl border border-ink/15 px-3 py-1.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        links: (form.links || []).filter((_, i) => i !== idx),
                      })
                    }
                    className="sm:col-span-1 justify-self-end p-1.5 text-maroon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
                Save Entry
              </button>
            </div>
          </div>
        </form>
      </div>

      <PreviewModal
        open={previewOpen}
        title={previewData.organization || 'Entry Preview'}
        onClose={() => setPreviewOpen(false)}
      >
        <div className="rounded-[28px] bg-white p-6 border border-ink/10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-lime px-3 py-0.5 font-mono text-[10px] font-semibold uppercase text-ink">
              {previewData.category}
            </span>
            <span className="font-mono text-xs text-ink/60">
              {previewData.period}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h4 className="font-display text-2xl font-bold text-ink">
              {previewData.organization}
            </h4>
            <span className="font-serif italic text-xl text-maroon">
              {previewData.role}
            </span>
          </div>
          <p className="text-sm text-ink/80">{previewData.summary}</p>
          {previewData.details.map((d) => (
            <p key={d} className="text-xs text-ink/70">
              • {d}
            </p>
          ))}
        </div>
      </PreviewModal>
    </div>
  );
};
