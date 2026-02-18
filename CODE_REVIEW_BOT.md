# 🤖 Code Review Bot

## Your AI Senior Developer Watching Every Save

Automatically review code for quality, security, and performance issues on every file save. Like having a senior developer always watching your code!

---

## ✨ Features

### 🛡️ Security Checks
- **XSS Vulnerabilities**: Detects `innerHTML`, `dangerouslySetInnerHTML`
- **Injection Risks**: Finds `eval()`, `exec()`, SQL injection patterns
- **Hardcoded Secrets**: Catches passwords, API keys in code
- **Authentication Issues**: Identifies auth vulnerabilities

### ⚡ Performance Analysis
- **Inefficient Code**: Detects slow algorithms
- **Memory Leaks**: Finds potential memory issues
- **Console Logs**: Flags debug code in production
- **Unnecessary Operations**: Identifies redundant code

### ✅ Code Quality
- **Complexity**: Measures function complexity
- **Code Smells**: Detects anti-patterns
- **Type Safety**: Checks TypeScript usage
- **Maintainability**: Evaluates code structure

### 👁️ Best Practices
- **Language Conventions**: Enforces standards
- **Design Patterns**: Suggests improvements
- **Code Style**: Checks formatting
- **Documentation**: Ensures clarity

---

## 🚀 Usage

### Auto-Review on Save

1. **Open a file** in Codiner
2. **Enable** "Auto-review on save" toggle
3. **Save the file** (Ctrl+S)
4. **Review appears** automatically!

### Manual Review

1. **Click** "Review Now" button
2. **Wait** 2-5 seconds
3. **See results** with score and issues

### Programmatic Usage

```typescript
import { performCodeReview } from "@/lib/review/code-review-bot";

// Review a file
const review = await performCodeReview("/path/to/file.ts", true);

console.log(`Score: ${review.score}/100`);
console.log(`Issues: ${review.issues.length}`);
console.log(`Summary: ${review.summary}`);
```

---

## 📋 API Reference

### `performCodeReview(filePath, useAI?, ollamaHost?)`

Perform complete code review on a file.

**Parameters:**
- `filePath` (string) - Path to file
- `useAI` (boolean, optional) - Use AI review (default: true)
- `ollamaHost` (string, optional) - Ollama API URL

**Returns:** `Promise<CodeReview>`

```typescript
const review = await performCodeReview("/path/to/file.ts");

console.log(review.score);      // 85
console.log(review.issues);     // Array of issues
console.log(review.summary);    // "Good code quality..."
```

### `autoReviewOnSave(filePath, onReviewComplete?)`

Enable auto-review when file is saved.

**Parameters:**
- `filePath` (string) - Path to file
- `onReviewComplete` (function, optional) - Callback with results

**Returns:** `Promise<void>`

```typescript
await autoReviewOnSave("/path/to/file.ts", (review) => {
  console.log(`Auto-review complete: ${review.score}/100`);
});
```

### `performStaticAnalysis(code, language)`

Perform static code analysis without AI.

**Parameters:**
- `code` (string) - Source code
- `language` (string) - Programming language

**Returns:** `ReviewIssue[]`

```typescript
const code = `
  const password = "hardcoded123";
  eval(userInput);
`;

const issues = performStaticAnalysis(code, "javascript");
// Returns security issues found
```

---

## 🎨 UI Component

### `<CodeReviewBot />`

React component for code review interface.

**Props:**
- `filePath` (string) - Path to file
- `fileName?` (string) - Display name (optional)
- `autoReviewEnabled?` (boolean) - Enable auto-review (default: false)

**Example:**

```tsx
import { CodeReviewBot } from "@/components/CodeReviewBot";

function Editor() {
  return (
    <CodeReviewBot
      filePath="/path/to/file.ts"
      fileName="app.ts"
      autoReviewEnabled={true}
    />
  );
}
```

---

## 🔧 Integration Steps

### 1. Register IPC Handlers

In your main Electron process:

```typescript
import { registerCodeReviewHandlers, cleanupCodeReviewWatchers } from "./ipc/handlers/code_review_handler";

app.whenReady().then(() => {
  registerCodeReviewHandlers();
});

app.on("quit", () => {
  cleanupCodeReviewWatchers();
});
```

### 2. Add to Editor UI

In your code editor component:

```tsx
import { CodeReviewBot } from "@/components/CodeReviewBot";

<CodeReviewBot
  filePath={currentFilePath}
  fileName={currentFileName}
  autoReviewEnabled={true}
/>
```

---

## 📊 Example Reviews

### Example 1: Security Issue

**Code:**
```javascript
const apiKey = "sk-1234567890abcdef";
document.innerHTML = userInput;
```

**Review:**
```
Score: 40/100
Issues: 2

🚨 CRITICAL - Security
Line 1: Hardcoded API key detected
💡 Use environment variables

🔴 HIGH - Security
Line 2: Using innerHTML can lead to XSS
💡 Use textContent or createElement instead
```

### Example 2: Performance Issue

**Code:**
```javascript
function processData(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

**Review:**
```
Score: 75/100
Issues: 2

⚠️ MEDIUM - Quality
Line 2: Use 'let' or 'const' instead of 'var'
💡 Modern JavaScript best practice

🔵 LOW - Performance
Line 3: Remove console.log in production
💡 Use proper logging library
```

### Example 3: Clean Code

**Code:**
```typescript
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Review:**
```
Score: 100/100
Issues: 0

✅ Excellent code quality!
No issues found. Your code looks great! 🎉
```

---

## 🎯 Issue Severity Levels

| Severity | Score Impact | Description | Example |
|----------|--------------|-------------|---------|
| **Critical** | -20 | Immediate security risk | Hardcoded passwords |
| **High** | -10 | Significant issue | XSS vulnerability |
| **Medium** | -5 | Should be fixed | Using `var` instead of `let` |
| **Low** | -2 | Minor improvement | Console.log statements |
| **Info** | 0 | Informational | TODO comments |

---

## 🔍 Detection Patterns

### Security Patterns

```typescript
// Detected patterns:
eval()                          // Code execution risk
innerHTML =                     // XSS vulnerability
dangerouslySetInnerHTML        // React XSS risk
password = "..."               // Hardcoded password
api_key = "..."                // Hardcoded API key
exec()                         // Command injection risk
```

### Performance Patterns

```typescript
// Detected patterns:
console.log()                  // Debug code
for (var ...)                  // Old-style loops
== instead of ===              // Loose equality
!= instead of !==              // Loose inequality
```

### Quality Patterns

```typescript
// Detected patterns:
: any                          // TypeScript any type
// TODO:                       // Unfinished work
Functions > 50 lines           // Too complex
```

---

## 🔐 Security & Privacy

### Local Processing
- All analysis happens locally
- Uses local Ollama instance
- No code sent to cloud
- Your code stays private

### Safe File Access
- Read-only file access
- No file modifications
- Secure file watching
- Automatic cleanup

---

## ⚙️ Configuration

### Enable/Disable AI Review

```typescript
// Review with AI (slower, more thorough)
const review = await performCodeReview(filePath, true);

// Review without AI (faster, static only)
const review = await performCodeReview(filePath, false);
```

### Custom Ollama Model

```typescript
// In code-review-bot.ts
const response = await fetch(`${ollamaHost}/api/generate`, {
  body: JSON.stringify({
    model: "qwen2.5-coder:7b", // Change this
    // ...
  }),
});
```

### Adjust Severity Penalties

```typescript
// In code-review-bot.ts
const severityPenalties = {
  critical: 20,  // Adjust these
  high: 10,
  medium: 5,
  low: 2,
  info: 0,
};
```

---

## 🐛 Troubleshooting

### No Review Results

**Problem:** Review completes but shows no issues

**Solutions:**
1. Check file is valid code
2. Ensure language is supported
3. Verify Ollama is running for AI review

### Auto-Review Not Working

**Problem:** File saves but no review appears

**Solutions:**
1. Check "Auto-review on save" is enabled
2. Verify file watcher is active
3. Check file permissions

### Slow Reviews

**Problem:** Reviews take too long

**Solutions:**
1. Disable AI review for faster static analysis
2. Use smaller Ollama model
3. Review smaller files

---

## 💡 Pro Tips

### 1. Use Auto-Review During Development

Enable auto-review while coding:
- Catch issues immediately
- Learn best practices
- Improve code quality in real-time

### 2. Review Before Commits

Always review before committing:
```typescript
// Pre-commit hook
await performCodeReview(changedFile);
```

### 3. Batch Review Multiple Files

Review entire project:
```typescript
const reviews = await Promise.all(
  files.map(file => performCodeReview(file))
);

const avgScore = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;
console.log(`Project score: ${avgScore}/100`);
```

### 4. Customize for Your Team

Add team-specific patterns:
```typescript
// In code-review-bot.ts
const customPatterns = [
  {
    pattern: /\.then\(/gi,
    message: "Use async/await instead of .then()",
    severity: "medium",
  },
];
```

### 5. Track Progress Over Time

Log reviews to track improvement:
```typescript
const review = await performCodeReview(file);
await logReview(review); // Store in database
```

---

## 📈 Benefits

### For Developers
- ✅ Learn best practices in real-time
- ✅ Catch bugs before they ship
- ✅ Improve code quality
- ✅ Save debugging time

### For Teams
- ✅ Consistent code quality
- ✅ Reduced code review time
- ✅ Standardized practices
- ✅ Better onboarding

### For Projects
- ✅ Fewer bugs in production
- ✅ Better security
- ✅ Improved performance
- ✅ Maintainable codebase

---

## 🔗 Related Tools

- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **SonarQube**: Code quality platform
- **CodeClimate**: Automated code review

---

## 📝 Files Created

1. **`src/lib/review/code-review-bot.ts`** - Core logic (600+ lines)
2. **`src/ipc/handlers/code_review_handler.ts`** - IPC handlers
3. **`src/components/CodeReviewBot.tsx`** - UI component

---

## 🎯 Next Steps

1. ✅ Install Ollama and models
2. ✅ Register IPC handlers
3. ✅ Add component to editor
4. ✅ Enable auto-review
5. ✅ Start coding with AI watching!

---

## 📖 Supported Languages

| Language | Detection | AI Review | Static Analysis |
|----------|-----------|-----------|-----------------|
| **TypeScript** | ✅ | ✅ | ✅ |
| **JavaScript** | ✅ | ✅ | ✅ |
| **Python** | ✅ | ✅ | ⚠️ Limited |
| **Java** | ✅ | ✅ | ⚠️ Limited |
| **C/C++** | ✅ | ✅ | ⚠️ Limited |
| **Go** | ✅ | ✅ | ⚠️ Limited |
| **Rust** | ✅ | ✅ | ⚠️ Limited |

---

**Made with ❤️ for Codiner**  
*Your AI senior developer, always watching, always helping*
