import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { hashPassword } from '../auth.mjs';

const ENV_PATH = path.resolve(process.cwd(), 'server', '.env');

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--email' && args[i + 1]) parsed.email = args[++i];
    if (args[i] === '--password' && args[i + 1]) parsed.password = args[++i];
  }
  return parsed;
}

async function main() {
  const cli = parseArgs();
  let email = cli.email;
  let password = cli.password;

  if (!email || !password) {
    const rl = readline.createInterface({ input, output });
    try {
      email = email || (await rl.question('Admin Email (default sharviaggarwal210@gmail.com): ')) || 'sharviaggarwal210@gmail.com';
      password = password || (await rl.question('New Admin Password (min 8 chars): '));
    } finally {
      rl.close();
    }
  }

  if (!password || password.length < 8) {
    console.error('Error: Password must be at least 8 characters.');
    process.exit(1);
  }

  let existingJwtSecret = '';
  if (fs.existsSync(ENV_PATH)) {
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    const match = content.match(/^JWT_SECRET=(.+)$/m);
    if (match) existingJwtSecret = match[1].trim();
  }

  const jwtSecret = existingJwtSecret || crypto.randomBytes(32).toString('hex');
  const hash = hashPassword(password);

  const envBody = [
    'PORT=4000',
    'NODE_ENV=development',
    `JWT_SECRET=${jwtSecret}`,
    `ADMIN_EMAIL=${email.trim().toLowerCase()}`,
    `ADMIN_PASSWORD_HASH=${hash}`,
    'CORS_ORIGIN=http://localhost:5175',
    '',
  ].join('\n');

  fs.mkdirSync(path.dirname(ENV_PATH), { recursive: true });
  fs.writeFileSync(ENV_PATH, envBody, 'utf8');
  console.log(`Saved admin configuration to ${ENV_PATH} for ${email.trim().toLowerCase()}`);
}

main();
