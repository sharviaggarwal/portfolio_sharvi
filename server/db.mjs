import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import {
  SEED_ABOUT_STORY,
  SEED_CONTACT,
  SEED_EDUCATION,
  SEED_EXPERIENCE,
  SEED_MEMORIES,
  SEED_PROFILE,
  SEED_PROJECTS,
  SEED_SKILLS,
  SEED_TECH_CATEGORIES,
} from './seedData.mjs';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_PATH = path.join(DATA_DIR, 'portfolio.db');

let db;

export function getDb() {
  if (db) return db;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  initSchema(db);
  seedIfEmpty(db);
  return db;
}

function initSchema(conn) {
  conn.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS education (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 1,
      published INTEGER NOT NULL DEFAULT 1,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 1,
      published INTEGER NOT NULL DEFAULT 1,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS experience (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 1,
      category TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 1,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 1,
      category_id TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 1,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS memories (
      id TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 1,
      published INTEGER NOT NULL DEFAULT 1,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

function nowIso() {
  return new Date().toISOString();
}

function seedIfEmpty(conn) {
  const existingProfile = conn
    .prepare('SELECT key FROM site_settings WHERE key = ?')
    .get('profile');

  if (!existingProfile) {
    const insertSetting = conn.prepare(
      'INSERT OR REPLACE INTO site_settings (key, value_json, updated_at) VALUES (?, ?, ?)'
    );
    insertSetting.run('profile', JSON.stringify(SEED_PROFILE), nowIso());
    insertSetting.run('aboutStory', JSON.stringify(SEED_ABOUT_STORY), nowIso());
    insertSetting.run('techCategories', JSON.stringify(SEED_TECH_CATEGORIES), nowIso());
    insertSetting.run('contact', JSON.stringify(SEED_CONTACT), nowIso());
  }

  const eduCount = conn.prepare('SELECT COUNT(*) as c FROM education').get().c;
  if (eduCount === 0) {
    const stmt = conn.prepare(
      'INSERT INTO education (id, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?)'
    );
    SEED_EDUCATION.forEach((item, idx) => {
      stmt.run(item.id, idx + 1, item.published !== false ? 1 : 0, JSON.stringify(item), nowIso());
    });
  }

  const projCount = conn.prepare('SELECT COUNT(*) as c FROM projects').get().c;
  if (projCount === 0) {
    const stmt = conn.prepare(
      'INSERT INTO projects (id, slug, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    );
    SEED_PROJECTS.forEach((item) => {
      stmt.run(
        item.id,
        item.slug,
        item.order,
        item.published !== false ? 1 : 0,
        JSON.stringify(item),
        nowIso()
      );
    });
  }

  const expCount = conn.prepare('SELECT COUNT(*) as c FROM experience').get().c;
  if (expCount === 0) {
    const stmt = conn.prepare(
      'INSERT INTO experience (id, sort_order, category, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    );
    SEED_EXPERIENCE.forEach((item, idx) => {
      stmt.run(
        item.id,
        idx + 1,
        item.category,
        item.published !== false ? 1 : 0,
        JSON.stringify(item),
        nowIso()
      );
    });
  }

  const skillCount = conn.prepare('SELECT COUNT(*) as c FROM skills').get().c;
  if (skillCount === 0) {
    const stmt = conn.prepare(
      'INSERT INTO skills (id, sort_order, category_id, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    );
    SEED_SKILLS.forEach((item, idx) => {
      stmt.run(
        item.id,
        idx + 1,
        item.categoryId,
        item.published !== false ? 1 : 0,
        JSON.stringify(item),
        nowIso()
      );
    });
  }

  const memCount = conn.prepare('SELECT COUNT(*) as c FROM memories').get().c;
  if (memCount === 0) {
    const stmt = conn.prepare(
      'INSERT INTO memories (id, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?)'
    );
    SEED_MEMORIES.forEach((item, idx) => {
      stmt.run(
        item.id,
        idx + 1,
        item.published !== false ? 1 : 0,
        JSON.stringify(item),
        nowIso()
      );
    });
  }
}

function getSetting(conn, key, fallback) {
  const row = conn.prepare('SELECT value_json FROM site_settings WHERE key = ?').get(key);
  if (!row) return fallback;
  return JSON.parse(row.value_json);
}

export function getPortfolioSnapshot({ includeUnpublished = false } = {}) {
  const conn = getDb();
  const filterSql = includeUnpublished ? '' : 'WHERE published = 1';

  const profileBase = getSetting(conn, 'profile', SEED_PROFILE);
  const aboutStory = getSetting(conn, 'aboutStory', SEED_ABOUT_STORY);
  const techCategories = getSetting(conn, 'techCategories', SEED_TECH_CATEGORIES);
  const contact = getSetting(conn, 'contact', SEED_CONTACT);

  const education = conn
    .prepare(`SELECT data_json, published FROM education ${filterSql} ORDER BY sort_order ASC`)
    .all()
    .map((r) => ({ ...JSON.parse(r.data_json), published: r.published === 1 }));

  const projects = conn
    .prepare(`SELECT data_json, published FROM projects ${filterSql} ORDER BY sort_order ASC`)
    .all()
    .map((r) => ({ ...JSON.parse(r.data_json), published: r.published === 1 }));

  const experience = conn
    .prepare(`SELECT data_json, published FROM experience ${filterSql} ORDER BY sort_order ASC`)
    .all()
    .map((r) => ({ ...JSON.parse(r.data_json), published: r.published === 1 }));

  const skills = conn
    .prepare(`SELECT data_json, published FROM skills ${filterSql} ORDER BY sort_order ASC`)
    .all()
    .map((r) => ({ ...JSON.parse(r.data_json), published: r.published === 1 }));

  const memories = conn
    .prepare(`SELECT data_json, published FROM memories ${filterSql} ORDER BY sort_order ASC`)
    .all()
    .map((r) => ({ ...JSON.parse(r.data_json), published: r.published === 1 }));

  return {
    profile: {
      ...profileBase,
      education: education.length > 0 ? education : SEED_EDUCATION,
    },
    aboutStory,
    projects,
    experience,
    techCategories,
    skills,
    memories,
    contact,
  };
}

export function saveProfileMeta(profileMeta) {
  const conn = getDb();
  conn
    .prepare('INSERT OR REPLACE INTO site_settings (key, value_json, updated_at) VALUES (?, ?, ?)')
    .run('profile', JSON.stringify(profileMeta), nowIso());
  return profileMeta;
}

export function upsertEducation(entry) {
  const conn = getDb();
  const existing = conn.prepare('SELECT sort_order FROM education WHERE id = ?').get(entry.id);
  const sortOrder = existing
    ? existing.sort_order
    : conn.prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM education').get().next;

  conn
    .prepare(
      'INSERT OR REPLACE INTO education (id, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?)'
    )
    .run(entry.id, sortOrder, entry.published ? 1 : 0, JSON.stringify(entry), nowIso());
  return entry;
}

export function deleteEducation(id) {
  const conn = getDb();
  const info = conn.prepare('DELETE FROM education WHERE id = ?').run(id);
  return info.changes > 0;
}

export function upsertProject(project) {
  const conn = getDb();
  conn
    .prepare(
      'INSERT OR REPLACE INTO projects (id, slug, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(
      project.id,
      project.slug,
      project.order,
      project.published ? 1 : 0,
      JSON.stringify(project),
      nowIso()
    );
  return project;
}

export function deleteProject(id) {
  const conn = getDb();
  const info = conn.prepare('DELETE FROM projects WHERE id = ?').run(id);
  return info.changes > 0;
}

export function upsertExperience(entry) {
  const conn = getDb();
  const existing = conn.prepare('SELECT sort_order FROM experience WHERE id = ?').get(entry.id);
  const parsedIndex = Number.parseInt(entry.index, 10);
  const sortOrder = Number.isFinite(parsedIndex)
    ? parsedIndex
    : existing
    ? existing.sort_order
    : conn.prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM experience').get().next;

  conn
    .prepare(
      'INSERT OR REPLACE INTO experience (id, sort_order, category, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(
      entry.id,
      sortOrder,
      entry.category,
      entry.published ? 1 : 0,
      JSON.stringify(entry),
      nowIso()
    );
  return entry;
}

export function deleteExperience(id) {
  const conn = getDb();
  const info = conn.prepare('DELETE FROM experience WHERE id = ?').run(id);
  return info.changes > 0;
}

export function upsertSkill(skill) {
  const conn = getDb();
  const existing = conn.prepare('SELECT sort_order FROM skills WHERE id = ?').get(skill.id);
  const sortOrder = existing
    ? existing.sort_order
    : conn.prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM skills').get().next;

  conn
    .prepare(
      'INSERT OR REPLACE INTO skills (id, sort_order, category_id, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(
      skill.id,
      sortOrder,
      skill.categoryId,
      skill.published ? 1 : 0,
      JSON.stringify(skill),
      nowIso()
    );
  return skill;
}

export function deleteSkill(id) {
  const conn = getDb();
  const info = conn.prepare('DELETE FROM skills WHERE id = ?').run(id);
  return info.changes > 0;
}

export function upsertMemory(memory) {
  const conn = getDb();
  const existing = conn.prepare('SELECT sort_order FROM memories WHERE id = ?').get(memory.id);
  const sortOrder = existing
    ? existing.sort_order
    : conn.prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 as next FROM memories').get().next;

  conn
    .prepare(
      'INSERT OR REPLACE INTO memories (id, sort_order, published, data_json, updated_at) VALUES (?, ?, ?, ?, ?)'
    )
    .run(memory.id, sortOrder, memory.published ? 1 : 0, JSON.stringify(memory), nowIso());
  return memory;
}

export function deleteMemory(id) {
  const conn = getDb();
  const info = conn.prepare('DELETE FROM memories WHERE id = ?').run(id);
  return info.changes > 0;
}
