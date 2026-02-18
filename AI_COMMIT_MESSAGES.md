# 🎯 AI Commit Message Generator

## Professional Git Commits with AI

Automatically generate professional, conventional commit messages by analyzing your staged changes using local AI.

---

## ✨ Features

### 🤖 AI-Powered Analysis
- Analyzes git diff and file changes
- Understands code context
- Generates professional commit messages
- Follows Conventional Commits standard

### 📊 Smart Type Detection
Automatically detects commit type based on changes:
- **feat** - New features
- **fix** - Bug fixes
- **docs** - Documentation changes
- **style** - Code formatting
- **refactor** - Code restructuring
- **perf** - Performance improvements
- **test** - Test additions/changes
- **build** - Build system changes
- **ci** - CI/CD changes
- **chore** - Maintenance tasks

### 🎯 Scope Extraction
Intelligently extracts scope from file paths:
- `src/components/Button.tsx` → `components`
- `src/lib/auth/login.ts` → `auth`
- `src/api/users.ts` → `api`

### ✅ Validation
- Real-time message validation
- Conventional Commits format checking
- Length validation
- Capitalization checking

### 💡 Multiple Suggestions
- Primary AI-generated suggestion
- Alternative suggestions
- Confidence scores
- Easy selection

---

## 🚀 Usage

### In Codiner UI

1. **Stage your changes** in git
2. **Open commit dialog**
3. **Click "Generate AI Commit Message"**
4. **Review suggestions**
5. **Select or edit message**
6. **Commit!**

### Programmatic Usage

```typescript
import { generateCommitSuggestions } from "@/lib/git/commit-message-generator";

// Generate suggestions
const suggestions = await generateCommitSuggestions("/path/to/project");

// Use the first suggestion
console.log(suggestions[0].message);
// Output: "feat(auth): add JWT middleware and login endpoint"
```

---

## 📋 API Reference

### `generateCommitMessage(diff, files, ollamaHost?)`

Generate a single commit message suggestion.

**Parameters:**
- `diff` (string) - Git diff output
- `files` (GitDiff[]) - Array of changed files
- `ollamaHost` (string, optional) - Ollama API URL (default: `http://localhost:11434`)

**Returns:** `Promise<CommitMessageSuggestion>`

```typescript
const suggestion = await generateCommitMessage(diff, files);
console.log(suggestion.message);
// "feat(ui): add dark mode toggle"
```

### `generateCommitSuggestions(projectPath, ollamaHost?)`

Generate multiple commit message suggestions.

**Parameters:**
- `projectPath` (string) - Path to git repository
- `ollamaHost` (string, optional) - Ollama API URL

**Returns:** `Promise<CommitMessageSuggestion[]>`

```typescript
const suggestions = await generateCommitSuggestions("/path/to/repo");
suggestions.forEach(s => console.log(s.message));
```

### `validateCommitMessage(message)`

Validate a commit message against Conventional Commits standard.

**Parameters:**
- `message` (string) - Commit message to validate

**Returns:** `{ valid: boolean; errors: string[] }`

```typescript
const validation = validateCommitMessage("feat: add feature");
if (validation.valid) {
  console.log("Valid commit message!");
} else {
  console.log("Errors:", validation.errors);
}
```

### `getStagedFiles(projectPath)`

Get list of staged files with statistics.

**Parameters:**
- `projectPath` (string) - Path to git repository

**Returns:** `Promise<GitDiff[]>`

```typescript
const files = await getStagedFiles("/path/to/repo");
files.forEach(f => {
  console.log(`${f.file}: +${f.additions}/-${f.deletions}`);
});
```

---

## 🎨 UI Component

### `<CommitMessageGenerator />`

React component for AI commit message generation.

**Props:**
- `projectPath` (string) - Path to git repository
- `onCommitMessageSelect?` (function) - Callback when message is selected

**Example:**

```tsx
import { CommitMessageGenerator } from "@/components/CommitMessageGenerator";

function GitCommitDialog() {
  const handleMessageSelect = (message: string) => {
    console.log("Selected:", message);
    // Use message for commit
  };

  return (
    <CommitMessageGenerator
      projectPath="/path/to/project"
      onCommitMessageSelect={handleMessageSelect}
    />
  );
}
```

---

## 🔧 Integration Steps

### 1. Register IPC Handlers

In your main Electron process:

```typescript
import { registerCommitMessageHandlers } from "./ipc/handlers/commit_message_handler";

app.whenReady().then(() => {
  registerCommitMessageHandlers();
});
```

### 2. Add to Git Commit UI

In your commit dialog component:

```tsx
import { CommitMessageGenerator } from "@/components/CommitMessageGenerator";
import { useState } from "react";

function CommitDialog({ projectPath }: { projectPath: string }) {
  const [commitMessage, setCommitMessage] = useState("");

  return (
    <div>
      <CommitMessageGenerator
        projectPath={projectPath}
        onCommitMessageSelect={setCommitMessage}
      />
      
      <button onClick={() => commit(commitMessage)}>
        Commit Changes
      </button>
    </div>
  );
}
```

---

## 📊 Examples

### Example 1: Feature Addition

**Changes:**
```
src/components/LoginForm.tsx (+45/-0)
src/lib/auth.ts (+30/-0)
```

**Generated Message:**
```
feat(auth): add login form with JWT authentication
```

### Example 2: Bug Fix

**Changes:**
```
src/api/users.ts (+5/-3)
```

**Generated Message:**
```
fix(api): handle null user data in response
```

### Example 3: Documentation

**Changes:**
```
README.md (+20/-5)
docs/setup.md (+15/-0)
```

**Generated Message:**
```
docs: update installation and setup guides
```

### Example 4: Refactoring

**Changes:**
```
src/utils/helpers.ts (+30/-45)
src/lib/validation.ts (+20/-15)
```

**Generated Message:**
```
refactor(utils): simplify validation logic
```

### Example 5: Multiple Scopes

**Changes:**
```
src/components/Button.tsx (+10/-5)
src/components/Input.tsx (+8/-3)
src/lib/theme.ts (+15/-0)
```

**Generated Message:**
```
feat(ui): add theme support to components
```

---

## 🎯 Conventional Commits Format

### Structure

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description | Example |
|------|-------------|---------|
| **feat** | New feature | `feat(auth): add OAuth login` |
| **fix** | Bug fix | `fix(api): handle timeout errors` |
| **docs** | Documentation | `docs: update API reference` |
| **style** | Formatting | `style: fix indentation` |
| **refactor** | Code restructure | `refactor(db): optimize queries` |
| **perf** | Performance | `perf(render): reduce re-renders` |
| **test** | Tests | `test(auth): add login tests` |
| **build** | Build system | `build: upgrade webpack` |
| **ci** | CI/CD | `ci: add GitHub Actions` |
| **chore** | Maintenance | `chore: update dependencies` |

### Rules

1. ✅ Use imperative mood ("add" not "added")
2. ✅ Don't capitalize first letter
3. ✅ No period at the end
4. ✅ Keep first line under 100 characters
5. ✅ Scope is optional but recommended

---

## 🔐 Security & Privacy

### Local Processing
- All analysis happens locally
- Uses local Ollama instance
- No data sent to cloud
- Git diff stays on your machine

### Safe Execution
- Validates all inputs
- Sanitizes git commands
- Error handling for all operations
- No arbitrary command execution

---

## ⚙️ Configuration

### Ollama Model

The generator uses `qwen2.5-coder:7b` by default. You can change this in the code:

```typescript
// In commit-message-generator.ts
const response = await fetch(`${ollamaHost}/api/generate`, {
  body: JSON.stringify({
    model: "qwen2.5-coder:7b", // Change this
    // ...
  }),
});
```

### Temperature Settings

Adjust AI creativity:

```typescript
options: {
  temperature: 0.3, // Lower = more consistent (0.0-1.0)
  top_p: 0.9,       // Nucleus sampling
}
```

---

## 🐛 Troubleshooting

### No Suggestions Generated

**Problem:** Generator returns empty suggestions

**Solutions:**
1. Ensure files are staged: `git add <files>`
2. Check Ollama is running: `curl http://localhost:11434`
3. Verify model is installed: `ollama list`

### Invalid Format

**Problem:** Generated message doesn't follow format

**Solutions:**
1. The generator has fallback logic
2. Edit the message manually
3. Use validation to check format

### Slow Generation

**Problem:** Takes too long to generate

**Solutions:**
1. Use smaller model (7B instead of 14B)
2. Reduce diff size (stage fewer files)
3. Check system resources

---

## 💡 Pro Tips

### 1. Stage Related Changes Together

```bash
# Good - related changes
git add src/auth/*.ts

# Avoid - unrelated changes
git add src/auth/*.ts src/ui/*.tsx
```

### 2. Review Before Committing

Always review the AI-generated message. The AI is smart but not perfect!

### 3. Use Scopes Consistently

Establish scope conventions in your team:
- `auth` - Authentication
- `ui` - User interface
- `api` - API endpoints
- `db` - Database
- `docs` - Documentation

### 4. Combine with Git Hooks

Add to `.git/hooks/prepare-commit-msg`:

```bash
#!/bin/sh
# Auto-generate commit message if empty
if [ -z "$(cat $1)" ]; then
  # Call your AI generator here
fi
```

---

## 📈 Benefits

### For Developers
- ✅ Save time writing commit messages
- ✅ Consistent message format
- ✅ Better git history
- ✅ Learn best practices

### For Teams
- ✅ Standardized commits
- ✅ Easier code review
- ✅ Better changelogs
- ✅ Improved collaboration

### For Projects
- ✅ Professional git history
- ✅ Automated changelog generation
- ✅ Semantic versioning support
- ✅ Better documentation

---

## 🔗 Related Tools

- **Conventional Commits**: https://www.conventionalcommits.org/
- **Commitizen**: CLI tool for conventional commits
- **Semantic Release**: Automated versioning based on commits
- **Changelog Generator**: Generate changelogs from commits

---

## 📝 Files Created

1. **`src/lib/git/commit-message-generator.ts`** - Core logic
2. **`src/ipc/handlers/commit_message_handler.ts`** - IPC handlers
3. **`src/components/CommitMessageGenerator.tsx`** - UI component

---

## 🎯 Next Steps

1. ✅ Install Ollama and models
2. ✅ Register IPC handlers
3. ✅ Add component to commit UI
4. ✅ Test with real commits
5. ✅ Customize for your workflow

---

**Made with ❤️ for Codiner**  
*Professional git commits powered by local AI*
