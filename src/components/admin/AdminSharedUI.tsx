import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Trash2, Upload, X } from 'lucide-react';
import { portfolioApi } from '../../lib/api';

export const StatusBadge: React.FC<{ published?: boolean }> = ({ published = true }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border ${
      published
        ? 'bg-lime text-ink border-ink/15'
        : 'bg-white text-ink/60 border-ink/15'
    }`}
  >
    {published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
    {published ? 'Published' : 'Draft'}
  </span>
);

interface FileUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  helper?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  value,
  onChange,
  accept = 'image/png,image/jpeg,image/webp,image/gif,application/pdf',
  helper,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const uploaded = await portfolioApi.uploadFile(file);
      onChange(uploaded.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const isImage =
    value && !value.toLowerCase().endsWith('.pdf') && !value.includes('/documents/');

  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-[11px] uppercase tracking-wider text-ink/70 font-semibold">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... or https://..."
          className="flex-1 min-w-[200px] rounded-xl border border-ink/15 bg-white px-3.5 py-2 text-sm text-ink focus:border-maroon focus:outline-none"
        />
        <label className="inline-flex items-center gap-1.5 rounded-xl bg-ink text-white hover:bg-maroon px-3.5 py-2 text-xs font-semibold cursor-pointer transition-colors">
          {uploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" accept={accept} onChange={handleFile} className="hidden" />
        </label>
      </div>
      {helper && <p className="text-xs text-ink/55">{helper}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {value && isImage && (
        <div className="mt-2 inline-flex items-center gap-3 rounded-xl bg-offwhite p-2 border border-ink/10">
          <img
            src={value}
            alt="Uploaded preview"
            className="h-14 w-24 rounded-lg object-cover bg-charcoal"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs font-mono text-maroon hover:underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export const ConfirmDeleteModal: React.FC<{
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ open, title, description, loading, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-ink/10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 text-maroon">
            <Trash2 className="w-5 h-5" />
            <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1 hover:bg-offwhite"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-ink/75">{description}</p>
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-xs font-semibold border border-ink/15 hover:bg-offwhite"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-full bg-maroon text-white px-5 py-2 text-xs font-bold hover:bg-ink disabled:opacity-60"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const PreviewModal: React.FC<{
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-[28px] bg-offwhite p-6 shadow-2xl border border-ink/15"
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-ink/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-maroon font-semibold">
              LIVE PORTFOLIO PREVIEW
            </span>
            <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white p-2 border border-ink/15 hover:bg-lime"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
