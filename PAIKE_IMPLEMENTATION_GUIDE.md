# 🚀 PAIKE Implementation Guide

## Quick Start

This guide will help you integrate the **Personal AI Knowledge Engine (PAIKE)** into Codiner.

---

## 📋 Prerequisites

- Node.js 20+
- Codiner project already set up
- Database migrations ready

---

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
# Navigate to project directory
cd c:\Users\setup\Videos\codiner.online

# Install required packages
npm install cheerio @babel/traverse
```

### 2. Run Database Migrations

```bash
# Generate migration files
npm run db:generate

# Apply migrations
npm run db:push
```

### 3. Register IPC Handlers

Add to your main process entry point (e.g., `src/main/index.ts`):

```typescript
// Import PAIKE handlers
import './ipc/handlers/paike-handlers';
```

### 4. Add PAIKE Route

Add to your router configuration:

```typescript
import { PAIKEDashboard } from '@/components/paike/PAIKEDashboard';

// Add route
{
  path: '/paike',
  component: PAIKEDashboard,
}
```

### 5. Add Navigation Link

Add to your sidebar/navigation:

```tsx
<NavLink to="/paike">
  <Brain className="w-5 h-5" />
  <span>AI Knowledge</span>
</NavLink>
```

---

## 🎯 Usage Examples

### Analyze Code Patterns

```typescript
// In your code editor component
const analyzeCurrentCode = async () => {
  const code = editor.getValue();
  const result = await window.electron.ipcRenderer.invoke(
    'paike:analyze-patterns',
    code,
    'typescript'
  );
  
  if (result.success) {
    console.log('Patterns found:', result.data);
  }
};
```

### Generate SEO Metadata

```typescript
// When generating a new page
const generatePageSEO = async (filePath: string, content: string) => {
  const result = await window.electron.ipcRenderer.invoke(
    'paike:generate-seo',
    filePath,
    content,
    projectId
  );
  
  if (result.success) {
    const metadata = result.data;
    console.log('SEO Metadata:', metadata);
  }
};
```

### Generate Sitemap

```typescript
// When building project
const generateSitemap = async () => {
  const result = await window.electron.ipcRenderer.invoke(
    'paike:generate-sitemap',
    projectPath,
    projectId,
    'https://myapp.com'
  );
  
  if (result.success) {
    const sitemap = result.data;
    
    // Export as XML
    const xmlResult = await window.electron.ipcRenderer.invoke(
      'paike:export-sitemap',
      sitemap,
      'xml'
    );
    
    console.log('Sitemap XML:', xmlResult.data);
  }
};
```

### Learn from User Decisions

```typescript
// When user edits AI-generated code
const learnFromEdit = async (aiCode: string, userCode: string) => {
  const decision = {
    context: {
      fileType: 'typescript',
      fileName: 'Component.tsx',
      projectType: 'react',
    },
    aiSuggestion: aiCode,
    userChoice: userCode,
    accepted: userCode !== aiCode,
    timestamp: new Date(),
  };
  
  await window.electron.ipcRenderer.invoke('paike:learn-decision', decision);
};
```

---

## 🎨 UI Integration

### Add PAIKE Widget to Editor

```tsx
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

export function PAIKEWidget() {
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    loadRecommendations();
  }, []);
  
  const loadRecommendations = async () => {
    const result = await window.electron.ipcRenderer.invoke(
      'paike:get-recommendations',
      { fileType: 'typescript' }
    );
    
    if (result.success) {
      setRecommendations(result.data);
    }
  };
  
  return (
    <div className="paike-widget">
      <h3 className="flex items-center gap-2">
        <Lightbulb className="w-4 h-4" />
        AI Suggestions
      </h3>
      {recommendations.map((rec, i) => (
        <div key={i} className="suggestion">
          <p>{rec.suggestion}</p>
          <span>{Math.round(rec.confidence * 100)}% confidence</span>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔄 Auto-Enhancement Integration

### Automatically Generate SEO on Build

```typescript
// In your build process
export async function buildProject(projectPath: string, projectId: string) {
  // ... existing build logic
  
  // Generate SEO for all pages
  const pages = await findAllPages(projectPath);
  
  for (const page of pages) {
    const content = await fs.readFile(page.path, 'utf-8');
    
    // Generate SEO metadata
    const seoResult = await window.electron.ipcRenderer.invoke(
      'paike:generate-seo',
      page.path,
      content,
      projectId
    );
    
    if (seoResult.success) {
      // Inject metadata into HTML
      const injectedResult = await window.electron.ipcRenderer.invoke(
        'paike:inject-seo',
        content,
        seoResult.data
      );
      
      if (injectedResult.success) {
        await fs.writeFile(page.path, injectedResult.data);
      }
    }
  }
  
  // Generate sitemap
  await window.electron.ipcRenderer.invoke(
    'paike:generate-sitemap',
    projectPath,
    projectId,
    'https://myapp.com'
  );
}
```

---

## 🎛️ Configuration

### Enable/Disable PAIKE Features

Add to your settings:

```typescript
interface PAIKESettings {
  enabled: boolean;
  features: {
    patternLearning: boolean;
    seoGeneration: boolean;
    performanceOptimization: boolean;
    sitemapGeneration: boolean;
  };
  aiProvider: 'ollama' | 'openai' | 'anthropic';
  model: string;
}

// Default settings
const defaultPAIKESettings: PAIKESettings = {
  enabled: true,
  features: {
    patternLearning: true,
    seoGeneration: true,
    performanceOptimization: true,
    sitemapGeneration: true,
  },
  aiProvider: 'ollama',
  model: 'qwen2.5-coder:7b',
};
```

---

## 📊 Monitoring

### Track Personalization Progress

```typescript
// Add to your analytics
const trackPAIKEProgress = async () => {
  const result = await window.electron.ipcRenderer.invoke('paike:get-stats');
  
  if (result.success) {
    const stats = result.data;
    
    console.log('Personalization Score:', stats.personalizationScore);
    console.log('Patterns Learned:', stats.patternsLearned);
    console.log('Problems Solved:', stats.problemsSolved);
    
    // Send to analytics
    analytics.track('PAIKE Progress', stats);
  }
};
```

---

## 🧪 Testing

### Test Pattern Analysis

```typescript
import { patternAnalyzer } from '@/lib/paike/pattern-analyzer';

describe('Pattern Analyzer', () => {
  it('should detect naming conventions', async () => {
    const code = `
      const myVariable = 'test';
      const anotherVariable = 'test2';
    `;
    
    const patterns = await patternAnalyzer.analyzeCode(code, 'typescript');
    
    expect(patterns).toContainEqual(
      expect.objectContaining({
        type: 'naming_convention',
        data: expect.objectContaining({
          style: 'camelCase',
        }),
      })
    );
  });
});
```

---

## 🔒 Privacy & Security

### Data Storage

All PAIKE data is stored locally in SQLite:

```
userData/
  └── codiner.db (contains PAIKE tables)
```

### Export User Data

```typescript
const exportUserData = async () => {
  const result = await window.electron.ipcRenderer.invoke('paike:export-data');
  
  if (result.success) {
    // Save to file
    const blob = new Blob([JSON.stringify(result.data, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paike-data.json';
    a.click();
  }
};
```

---

## 🎓 Best Practices

### 1. Gradual Learning

Don't expect perfect personalization immediately. PAIKE needs time to learn:

- **0-25%**: Just started, learning basic patterns
- **25-50%**: Recognizing your style
- **50-75%**: Adapting to preferences
- **75-100%**: Highly personalized

### 2. Provide Feedback

Help PAIKE learn faster by:

- Accepting good suggestions
- Editing AI-generated code (PAIKE learns from edits)
- Using consistent patterns

### 3. Review Auto-Generated SEO

Always review SEO metadata before deploying:

```typescript
// Show SEO preview before build
const reviewSEO = async (projectId: string) => {
  const result = await window.electron.ipcRenderer.invoke(
    'paike:get-project-seo',
    projectId
  );
  
  if (result.success) {
    // Show in UI for review
    showSEOReviewModal(result.data);
  }
};
```

---

## 🐛 Troubleshooting

### Database Errors

If you encounter database errors:

```bash
# Reset database
npm run db:push -- --force

# Or manually delete and recreate
rm userData/codiner.db
npm run db:push
```

### Pattern Analysis Not Working

Check that Babel parser is installed:

```bash
npm install @babel/parser @babel/traverse
```

### SEO Generation Fails

Ensure cheerio is installed:

```bash
npm install cheerio
```

---

## 📚 API Reference

### Pattern Analyzer

```typescript
// Analyze code
paike:analyze-patterns(code: string, fileType: string)

// Get recommendations
paike:get-recommendations(context: CodeContext)

// Learn from decision
paike:learn-decision(decision: UserDecision)

// Get personalization score
paike:get-personalization-score()
```

### SEO Generator

```typescript
// Generate SEO metadata
paike:generate-seo(filePath: string, content: string, projectId: string)

// Inject SEO into HTML
paike:inject-seo(html: string, metadata: SEOMetadata)

// Generate Open Graph tags
paike:generate-og-tags(pageData: PageData)

// Generate Schema.org markup
paike:generate-schema(pageType: string, data: any)
```

### Sitemap Generator

```typescript
// Generate sitemap
paike:generate-sitemap(projectPath: string, projectId: string, baseUrl?: string)

// Export sitemap
paike:export-sitemap(sitemap: Sitemap, format: 'xml' | 'html' | 'json')

// Write sitemap to file
paike:write-sitemap(sitemap: Sitemap, outputPath: string, format: string)
```

---

## 🎉 Next Steps

1. ✅ Install dependencies
2. ✅ Run database migrations
3. ✅ Register IPC handlers
4. ✅ Add PAIKE dashboard to UI
5. ✅ Test pattern analysis
6. ✅ Enable auto-SEO generation
7. ✅ Generate first sitemap
8. ✅ Monitor personalization progress

---

## 💡 Tips

- **Start small**: Enable one feature at a time
- **Monitor progress**: Check personalization score regularly
- **Provide feedback**: Edit AI suggestions to help PAIKE learn
- **Export data**: Regularly backup your knowledge base
- **Review SEO**: Always review auto-generated metadata

---

## 🆘 Support

If you encounter issues:

1. Check the console for errors
2. Review the database schema
3. Ensure all dependencies are installed
4. Check IPC handler registration
5. Open an issue on GitHub

---

**Happy coding with PAIKE! 🧠✨**
