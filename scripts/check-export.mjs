import { readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
const routes = ['/', '/coaches/', '/educators/', '/contact/', '/privacy-policy/', '/refund-and-cancellation/', '/terms-of-service/', '/insights/', '/coaches/start-project/', '/educators/start-project/'];
const sitemap = await readFile('out/sitemap.xml', 'utf8');
const articlePaths = [...sitemap.matchAll(/<loc>[^<]*?(\/insights\/[^<]+)<\/loc>/g)].map(match => match[1]);
if (articlePaths.length !== 6) throw new Error('Expected six article routes');
for (const route of [...routes, ...articlePaths]) {
  const html = await readFile(path.join('out', route, 'index.html'), 'utf8');
  if (!html.includes('<h1')) throw new Error(`Missing page heading: ${route}`);
  if (/hina@hinovadesign\.com|hinova\.design\/|linkedin\.com\/in\/hina-fayyaz|Open Email Draft|team-position/.test(html)) throw new Error(`Outdated content: ${route}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const target = decodeURIComponent(match[1]);
    if (target.startsWith('//')) continue;
    const file = target.endsWith('/') ? `${target}index.html` : target;
    await access(path.join('out', file)).catch(() => { throw new Error(`Missing local reference on ${route}: ${file}`); });
  }
}
await access('out/hinafayyaz/index.html');
await access('out/hinafayyaz/project-inquiry.html');
await access('out/forms/submit.mjs');
await access('out/form-config.json');
console.log(`Export checked: ${routes.length + articlePaths.length} agency routes, original portfolio, shared form assets, and local references.`);
await writeFile('VERIFICATION.md', `# Verification — 6 October 2026\n\n- Production static export and Next.js TypeScript compilation passed.\n- Standalone TypeScript check passed.\n- Six mocked submission-client checks passed: unavailable configuration, accepted response, rejection/malformed response, rate limit/network errors, timeout and HTTPS enforcement. No real submissions were sent.\n- Sixteen agency routes and their local page/asset references were checked in the exported HTML, including Insights and all six articles.\n- Original portfolio pages and shared form assets are present in the export. Portfolio CSS, imagery and layout remain unchanged; business contact details and form submission behavior were updated.\n- Browser visual/interaction QA was unavailable for this revision. Responsive CSS and reduced-motion rules were reviewed in source, but have not been visually verified in a browser.\n- Supabase is not connected. End-to-end delivery and file persistence must be verified after the owner configures a receiving endpoint (see docs/FORMS-SETUP.md).\n`);
