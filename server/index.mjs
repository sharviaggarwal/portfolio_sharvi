import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import {
  clearSessionCookie,
  createSessionToken,
  requireAdmin,
  SESSION_COOKIE_NAME,
  setSessionCookie,
  verifyPassword,
  verifySessionToken,
} from './auth.mjs';
import {
  deleteEducation,
  deleteExperience,
  deleteMemory,
  deleteProject,
  deleteSkill,
  getDb,
  getPortfolioSnapshot,
  saveProfileMeta,
  upsertEducation,
  upsertExperience,
  upsertMemory,
  upsertProject,
  upsertSkill,
} from './db.mjs';
import {
  educationSchema,
  experienceSchema,
  loginSchema,
  memorySchema,
  profileMetaSchema,
  projectSchema,
  skillSchema,
} from './validation.mjs';

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') });

const app = express();
const PORT = Number(process.env.PORT || 4000);
const UPLOADS_DIR = path.resolve(process.cwd(), 'server', 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Ensure SQLite DB & initial seed are ready on startup
getDb();

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Basic security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Simple in-memory login rate limiter (10 attempts per 15 min per IP)
const loginAttempts = new Map();
function checkLoginRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const entry = loginAttempts.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  loginAttempts.set(ip, entry);
  return entry.count <= 15;
}

// Persistent file upload configuration (images + PDFs only, max 10MB)
const ALLOWED_MIME_TO_EXT = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'application/pdf': '.pdf',
};

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const subDir = file.mimetype === 'application/pdf' ? 'documents' : 'images';
    const target = path.join(UPLOADS_DIR, subDir);
    fs.mkdirSync(target, { recursive: true });
    cb(null, target);
  },
  filename: (_req, file, cb) => {
    const ext = ALLOWED_MIME_TO_EXT[file.mimetype] || '';
    const safeName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TO_EXT[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Allowed: JPG, PNG, WebP, GIF, PDF.'));
    }
  },
});

// Serve persistent uploaded files
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d' }));

/* -------------------------------------------------------------------------- */
/* Auth Routes                                                                */
/* -------------------------------------------------------------------------- */
app.post('/api/auth/login', (req, res) => {
  const clientIp = req.ip || 'local';
  if (!checkLoginRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many login attempts. Please wait 15 minutes.' });
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid email or password format.' });
  }

  const configuredEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const configuredHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();

  if (!configuredEmail || !configuredHash) {
    return res.status(503).json({
      error: 'Admin credentials are not configured on the server. Run npm run admin:setup.',
    });
  }

  const emailMatches = parsed.data.email.toLowerCase() === configuredEmail;
  const passwordMatches = verifyPassword(parsed.data.password, configuredHash);

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = createSessionToken(configuredEmail);
  setSessionCookie(res, token);
  return res.json({ authenticated: true, admin: { email: configuredEmail } });
});

app.post('/api/auth/logout', (_req, res) => {
  clearSessionCookie(res);
  return res.json({ authenticated: false });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  const session = verifySessionToken(token);
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }
  return res.json({ authenticated: true, admin: { email: session.sub } });
});

/* -------------------------------------------------------------------------- */
/* Public Portfolio Routes                                                    */
/* -------------------------------------------------------------------------- */
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.get('/api/portfolio', (_req, res) => {
  const snapshot = getPortfolioSnapshot({ includeUnpublished: false });
  res.json(snapshot);
});

/* -------------------------------------------------------------------------- */
/* Protected Admin Routes                                                     */
/* -------------------------------------------------------------------------- */
app.get('/api/admin/portfolio', requireAdmin, (_req, res) => {
  const snapshot = getPortfolioSnapshot({ includeUnpublished: true });
  res.json(snapshot);
});

app.post('/api/admin/upload', requireAdmin, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    const subDir = req.file.mimetype === 'application/pdf' ? 'documents' : 'images';
    return res.status(201).json({
      url: `/uploads/${subDir}/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
  });
});

app.put('/api/admin/profile', requireAdmin, (req, res) => {
  const parsed = profileMetaSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid profile payload', details: parsed.error.flatten() });
  }
  const saved = saveProfileMeta(parsed.data);
  return res.json(saved);
});

// Projects CRUD
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  const parsed = projectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid project payload', details: parsed.error.flatten() });
  }
  try {
    const saved = upsertProject(parsed.data);
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Could not save project (slug may already exist)' });
  }
});

app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const parsed = projectSchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid project payload', details: parsed.error.flatten() });
  }
  try {
    const saved = upsertProject(parsed.data);
    return res.json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Could not update project' });
  }
});

app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  const deleted = deleteProject(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Project not found' });
  return res.json({ deleted: true, id: req.params.id });
});

// Experience, Leadership, Achievements & Certifications CRUD
app.post('/api/admin/experience', requireAdmin, (req, res) => {
  const parsed = experienceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid experience payload', details: parsed.error.flatten() });
  }
  return res.status(201).json(upsertExperience(parsed.data));
});

app.put('/api/admin/experience/:id', requireAdmin, (req, res) => {
  const parsed = experienceSchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid experience payload', details: parsed.error.flatten() });
  }
  return res.json(upsertExperience(parsed.data));
});

app.delete('/api/admin/experience/:id', requireAdmin, (req, res) => {
  const deleted = deleteExperience(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Entry not found' });
  return res.json({ deleted: true, id: req.params.id });
});

// Skills CRUD
app.post('/api/admin/skills', requireAdmin, (req, res) => {
  const parsed = skillSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid skill payload', details: parsed.error.flatten() });
  }
  return res.status(201).json(upsertSkill(parsed.data));
});

app.put('/api/admin/skills/:id', requireAdmin, (req, res) => {
  const parsed = skillSchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid skill payload', details: parsed.error.flatten() });
  }
  return res.json(upsertSkill(parsed.data));
});

app.delete('/api/admin/skills/:id', requireAdmin, (req, res) => {
  const deleted = deleteSkill(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Skill not found' });
  return res.json({ deleted: true, id: req.params.id });
});

// Education & Milestones CRUD
app.post('/api/admin/education', requireAdmin, (req, res) => {
  const parsed = educationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid education payload', details: parsed.error.flatten() });
  }
  return res.status(201).json(upsertEducation(parsed.data));
});

app.put('/api/admin/education/:id', requireAdmin, (req, res) => {
  const parsed = educationSchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid education payload', details: parsed.error.flatten() });
  }
  return res.json(upsertEducation(parsed.data));
});

app.delete('/api/admin/education/:id', requireAdmin, (req, res) => {
  const deleted = deleteEducation(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Education entry not found' });
  return res.json({ deleted: true, id: req.params.id });
});

// Moving Memories CRUD
app.post('/api/admin/memories', requireAdmin, (req, res) => {
  const parsed = memorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid memory payload', details: parsed.error.flatten() });
  }
  return res.status(201).json(upsertMemory(parsed.data));
});

app.put('/api/admin/memories/:id', requireAdmin, (req, res) => {
  const parsed = memorySchema.safeParse({ ...req.body, id: req.params.id });
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid memory payload', details: parsed.error.flatten() });
  }
  return res.json(upsertMemory(parsed.data));
});

app.delete('/api/admin/memories/:id', requireAdmin, (req, res) => {
  const deleted = deleteMemory(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Memory not found' });
  return res.json({ deleted: true, id: req.params.id });
});

/* -------------------------------------------------------------------------- */
/* Production Frontend Serving (when `npm run build` has generated dist/)     */
/* -------------------------------------------------------------------------- */
const DIST_DIR = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  app.use(express.static(DIST_DIR));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
      return next();
    }
    return res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Portfolio API server running on http://localhost:${PORT}`);
});
