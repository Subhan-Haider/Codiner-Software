# 📚 Auto-Documentation Generator

## Generate Professional Documentation with One Click

Automatically analyze your project and generate comprehensive, professional documentation using AI.

---

## ✨ What Gets Generated

### 1. **README.md** 📄
Professional project overview including:
- Project title and description
- Key features
- Installation instructions
- Usage examples
- Available scripts
- Tech stack
- Contributing guidelines
- License information

### 2. **docs/ARCHITECTURE.md** 🏗️
Technical architecture documentation:
- System design overview
- Architecture patterns (MVC, Component-based, etc.)
- Data flow diagrams
- Key technologies and their roles
- Design patterns used
- Component structure

### 3. **docs/SETUP.md** ⚙️
Complete setup guide:
- Prerequisites
- Step-by-step installation
- Environment configuration
- Build instructions
- Running tests
- Troubleshooting guide

### 4. **docs/STRUCTURE.md** 📁
Project structure documentation:
- Visual folder tree
- Directory descriptions
- File organization philosophy
- Module breakdown
- Code structure explanation

---

## 🚀 Usage

### In Codiner UI

1. **Open your project** in Codiner
2. **Navigate to** Documentation section
3. **Click** "Generate Full Project Documentation"
4. **Wait** for AI analysis (30-60 seconds)
5. **Done!** Check your project folder

### Programmatic Usage

```typescript
import { generateFullDocumentation, saveDocumentation } from "@/lib/docs/documentation-generator";

// Generate all documentation
const docs = await generateFullDocumentation("/path/to/project");

// Save to files
await saveDocumentation("/path/to/project", docs);

console.log("Documentation generated!");
```

---

## 📋 API Reference

### `generateFullDocumentation(projectPath, ollamaHost?)`

Generate complete documentation set for a project.

**Parameters:**
- `projectPath` (string) - Path to project root
- `ollamaHost` (string, optional) - Ollama API URL (default: `http://localhost:11434`)

**Returns:** `Promise<DocumentationSet>`

```typescript
const docs = await generateFullDocumentation("/path/to/project");

console.log(docs.readme);        // README content
console.log(docs.architecture);  // Architecture doc
console.log(docs.setup);         // Setup guide
console.log(docs.structure);     // Structure doc
```

### `saveDocumentation(projectPath, docs)`

Save generated documentation to files.

**Parameters:**
- `projectPath` (string) - Path to project root
- `docs` (DocumentationSet) - Generated documentation

**Returns:** `Promise<void>`

```typescript
await saveDocumentation("/path/to/project", docs);
// Creates:
// - README.md
// - docs/ARCHITECTURE.md
// - docs/SETUP.md
// - docs/STRUCTURE.md
```

### `analyzeProjectStructure(projectPath, maxDepth?)`

Analyze project folder structure.

**Parameters:**
- `projectPath` (string) - Path to project root
- `maxDepth` (number, optional) - Max depth to scan (default: 3)

**Returns:** `Promise<ProjectStructure>`

```typescript
const structure = await analyzeProjectStructure("/path/to/project");

console.log(structure.name);      // Project name
console.log(structure.children);  // Child directories/files
```

### `analyzePackageJson(projectPath)`

Extract information from package.json.

**Parameters:**
- `projectPath` (string) - Path to project root

**Returns:** `Promise<Partial<ProjectAnalysis>>`

```typescript
const info = await analyzePackageJson("/path/to/project");

console.log(info.name);           // Project name
console.log(info.dependencies);   // Dependencies
console.log(info.scripts);        // NPM scripts
```

---

## 🎨 UI Component

### `<DocumentationGenerator />`

React component for documentation generation.

**Props:**
- `projectPath` (string) - Path to project
- `projectName?` (string) - Display name (optional)

**Example:**

```tsx
import { DocumentationGenerator } from "@/components/DocumentationGenerator";

function ProjectSettings() {
  return (
    <DocumentationGenerator
      projectPath="/path/to/project"
      projectName="My Awesome App"
    />
  );
}
```

---

## 🔧 Integration Steps

### 1. Register IPC Handlers

In your main Electron process:

```typescript
import { registerDocumentationHandlers } from "./ipc/handlers/documentation_handler";

app.whenReady().then(() => {
  registerDocumentationHandlers();
});
```

### 2. Add to Project Settings

In your project settings UI:

```tsx
import { DocumentationGenerator } from "@/components/DocumentationGenerator";

<DocumentationGenerator projectPath={currentProjectPath} />
```

---

## 📊 Example Output

### Example README.md

```markdown
# My Awesome App

A modern web application built with Next.js and TypeScript.

## 🚀 Features

- ⚡ Fast and responsive
- 🎨 Beautiful UI with Tailwind CSS
- 🔐 Secure authentication
- 📱 Mobile-friendly

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🏃 Usage

\`\`\`bash
npm run dev
\`\`\`

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL

## 📝 License

MIT
```

### Example ARCHITECTURE.md

```markdown
# 🏗️ Architecture

## Overview

This application follows a modern component-based architecture using Next.js.

## Architecture Pattern

- **Pattern**: Component-based with Server Components
- **Data Flow**: Unidirectional (props down, events up)
- **State Management**: React Context + Hooks

## Key Technologies

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling

### Backend
- **Next.js API Routes**: RESTful endpoints
- **Prisma**: Database ORM
- **PostgreSQL**: Relational database

## Design Patterns

1. **Container/Presentational**: Separation of logic and UI
2. **Custom Hooks**: Reusable stateful logic
3. **HOC**: Cross-cutting concerns
```

---

## 🎯 Framework Detection

The generator automatically detects your framework:

| Framework | Detection |
|-----------|-----------|
| **Next.js** | `next` in dependencies |
| **React** | `react` in dependencies |
| **Vue** | `vue` in dependencies |
| **Angular** | `@angular/core` in dependencies |
| **Svelte** | `svelte` in dependencies |
| **Express** | `express` in dependencies |
| **Electron** | `electron` in dependencies |

---

## 🔍 What Gets Analyzed

### Project Files
- ✅ `package.json` - Dependencies, scripts, metadata
- ✅ Folder structure - Directory organization
- ✅ File types - Languages and frameworks used
- ✅ Configuration files - Build and dev setup

### Generated Content
- ✅ Framework-specific instructions
- ✅ Language-aware examples (JS vs TS)
- ✅ Dependency documentation
- ✅ Script explanations
- ✅ Architecture patterns

---

## 🔐 Security & Privacy

### Local Processing
- All analysis happens locally
- Uses local Ollama instance
- No data sent to cloud
- Project code stays on your machine

### Safe File Access
- Read-only operations
- Respects `.gitignore` patterns
- Skips `node_modules`, `.git`, etc.
- No file modifications during analysis

---

## ⚙️ Configuration

### Ignored Patterns

By default, these folders are skipped:

```typescript
const ignorePatterns = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
];
```

### Max Depth

Control how deep to scan:

```typescript
// Scan 3 levels deep (default)
const structure = await analyzeProjectStructure(path, 3);

// Scan 5 levels deep
const structure = await analyzeProjectStructure(path, 5);
```

### Ollama Model

Change the AI model used:

```typescript
// In documentation-generator.ts
const response = await fetch(`${ollamaHost}/api/generate`, {
  body: JSON.stringify({
    model: "qwen2.5-coder:7b", // Change this
    // ...
  }),
});
```

---

## 🐛 Troubleshooting

### No Documentation Generated

**Problem:** Generator completes but no files created

**Solutions:**
1. Check write permissions on project folder
2. Ensure `docs/` directory can be created
3. Check disk space

### Incomplete Documentation

**Problem:** Some sections are missing or generic

**Solutions:**
1. Ensure `package.json` exists and is valid
2. Check Ollama is running: `curl http://localhost:11434`
3. Verify model is installed: `ollama list`
4. Try regenerating

### Slow Generation

**Problem:** Takes too long to generate

**Solutions:**
1. Use smaller model (7B instead of 14B)
2. Reduce max depth for structure analysis
3. Check system resources

---

## 💡 Pro Tips

### 1. Keep package.json Updated

The generator relies heavily on `package.json`:

```json
{
  "name": "my-app",
  "description": "Clear, concise description",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

### 2. Regenerate After Major Changes

Regenerate documentation when you:
- Add new features
- Change architecture
- Update dependencies
- Refactor structure

### 3. Edit Generated Docs

The AI generates a great starting point, but you should:
- Add project-specific details
- Include screenshots
- Add API examples
- Update with team conventions

### 4. Version Control

Commit generated docs to git:

```bash
git add README.md docs/
git commit -m "docs: add auto-generated documentation"
```

### 5. Use for Open Source

Perfect for GitHub repos:
- Professional README
- Clear setup instructions
- Architecture overview
- Contributing guidelines

---

## 📈 Benefits

### For Developers
- ✅ Save hours of documentation writing
- ✅ Consistent documentation format
- ✅ Never forget setup steps
- ✅ Professional project presentation

### For Teams
- ✅ Onboard new developers faster
- ✅ Standardized documentation
- ✅ Reduced knowledge silos
- ✅ Better collaboration

### For Open Source
- ✅ Attract contributors
- ✅ Professional appearance
- ✅ Clear setup instructions
- ✅ Better discoverability

---

## 🔗 Related Tools

- **JSDoc**: Code documentation
- **TypeDoc**: TypeScript documentation
- **Storybook**: Component documentation
- **Docusaurus**: Documentation sites

---

## 📝 Files Created

1. **`src/lib/docs/documentation-generator.ts`** - Core logic (600+ lines)
2. **`src/ipc/handlers/documentation_handler.ts`** - IPC handlers
3. **`src/components/DocumentationGenerator.tsx`** - UI component

---

## 🎯 Next Steps

1. ✅ Install Ollama and models
2. ✅ Register IPC handlers
3. ✅ Add component to project settings
4. ✅ Generate documentation for your project
5. ✅ Edit and customize as needed
6. ✅ Commit to version control

---

## 📖 Example Use Cases

### Use Case 1: New Open Source Project

```typescript
// Generate docs for GitHub
await generateFullDocumentation("/path/to/new-project");

// Result: Professional README, setup guide, architecture docs
// Perfect for attracting contributors!
```

### Use Case 2: Team Onboarding

```typescript
// Generate docs for team project
await generateFullDocumentation("/path/to/team-project");

// Result: Clear setup instructions, architecture overview
// New developers can get started in minutes!
```

### Use Case 3: Client Deliverable

```typescript
// Generate docs for client project
await generateFullDocumentation("/path/to/client-project");

// Result: Professional documentation package
// Clients love clear, comprehensive docs!
```

---

**Made with ❤️ for Codiner**  
*Professional documentation powered by local AI*
