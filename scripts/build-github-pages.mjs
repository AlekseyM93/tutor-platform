import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apiDir = path.join(root, 'app', 'api');
const stashDir = path.join(root, '.github-pages-api-stash');

function stashApi() {
  if (fs.existsSync(apiDir)) {
    if (fs.existsSync(stashDir)) {
      fs.rmSync(stashDir, { recursive: true, force: true });
    }
    fs.renameSync(apiDir, stashDir);
  }
}

function restoreApi() {
  if (fs.existsSync(stashDir)) {
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(stashDir, apiDir);
  }
}

stashApi();
try {
  execSync('npx next build', {
    stdio: 'inherit',
    cwd: root,
    env: { ...process.env, NEXT_STATIC_EXPORT: 'true' }
  });
  const nojekyll = path.join(root, 'out', '.nojekyll');
  fs.writeFileSync(nojekyll, '', 'utf8');
} finally {
  restoreApi();
}
