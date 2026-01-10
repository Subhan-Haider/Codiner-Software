#!/usr/bin/env node

/**
 * Update template statistics in README.md
 */

const fs = require('fs');
const path = require('path');

function getTemplateStats() {
  const templatesDir = path.join(__dirname, '..', 'community-templates');
  const templates = fs.readdirSync(templatesDir)
    .filter(item => {
      const itemPath = path.join(templatesDir, item);
      return fs.statSync(itemPath).isDirectory() &&
             fs.existsSync(path.join(itemPath, 'package.json'));
    });

  return {
    count: templates.length,
    templates: templates
  };
}

function updateReadme() {
  const stats = getTemplateStats();
  const readmePath = path.join(__dirname, '..', 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');

  // Update template count
  readme = readme.replace(
    /- \*\*Total Templates\*\*: [0-9]+\+/,
    `- **Total Templates**: ${stats.count}+`
  );

  fs.writeFileSync(readmePath, readme);
  console.log(`✅ Updated template count to ${stats.count}`);
}

if (require.main === module) {
  updateReadme();
}
