# Contributing to Codiner Community Templates

Thank you for your interest in contributing to Codiner Community Templates! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Adding New Templates](#adding-new-templates)
- [Template Guidelines](#template-guidelines)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Basic knowledge of the framework you're contributing for

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/Codiner-Template.git
cd Codiner-Template

# Install dependencies (if any)
npm install

# Create your template in the appropriate directory
mkdir community-templates/your-template-name
```

## ➕ Adding New Templates

### 1. Choose Template Location

Create your template in the `community-templates/` directory:

```
community-templates/
├── your-template-name/          # Template directory
│   ├── src/                    # Source code
│   ├── public/                 # Static assets
│   ├── package.json            # Dependencies and scripts
│   ├── README.md               # Template documentation
│   └── ...                     # Other config files
```

### 2. Template Structure

Every template must include:

#### Required Files:
- `package.json` - Dependencies, scripts, and metadata
- `README.md` - Comprehensive setup and usage instructions
- Source code structure appropriate for the framework

#### Recommended Files:
- `.gitignore` - Git ignore patterns
- `tsconfig.json` - TypeScript configuration (if applicable)
- `eslint.config.js` - Linting configuration
- `prettier.config.js` - Code formatting configuration

### 3. Package.json Requirements

```json
{
  "name": "template-name",
  "version": "1.0.0",
  "description": "Brief description of the template",
  "scripts": {
    "dev": "development command",
    "build": "production build command",
    "lint": "linting command"
  },
  "keywords": ["framework", "typescript", "template"],
  "author": "Codiner",
  "license": "MIT"
}
```

### 4. README.md Template

```markdown
# Template Name

Brief description of what this template provides.

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/template-name my-project
cd my-project

# Install dependencies
npm install

# Start development
npm run dev
```

### Environment Setup (if applicable)

Create `.env.local`:

```bash
# Add required environment variables
API_KEY=your-api-key
DATABASE_URL=your-database-url
```

## 📁 Project Structure

```
template-name/
├── src/
│   ├── components/
│   ├── pages/
│   └── lib/
├── public/
├── package.json
└── README.md
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run test` - Run tests (if applicable)

## 🎨 Customization

Instructions for customizing the template...

## 🚀 Deployment

Deployment instructions for the template...

## 📚 Resources

- [Framework Documentation](https://framework.com)
- [Related Libraries](https://library.com)
```

## 📏 Template Guidelines

### ✅ Requirements

- **Production Ready**: Templates must be immediately usable for production
- **Well Documented**: Clear setup instructions and comprehensive README
- **Type Safe**: TypeScript preferred, proper typing encouraged
- **Modern Standards**: Follow current best practices
- **Cross Platform**: Work on Windows, macOS, and Linux
- **Accessible**: Follow accessibility guidelines (WCAG 2.1 AA)

### 🎯 Quality Standards

- **Code Quality**: ESLint configured, no linting errors
- **Dependencies**: Up-to-date, minimal necessary dependencies
- **Bundle Size**: Optimized for performance (< 500KB gzipped preferred)
- **Browser Support**: Modern browsers (last 2 versions)
- **Mobile Friendly**: Responsive design

### 🚫 Restrictions

- No paid services or APIs without free tier
- No hardcoded API keys or sensitive data
- No copyrighted materials
- No malicious or harmful code
- No NSFW content

## 💻 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Proper type definitions for all components
- Avoid `any` type, use proper types

### Code Style
- Follow Prettier configuration
- Consistent naming conventions
- Clear, readable code structure
- Comprehensive comments for complex logic

### File Organization
- Logical folder structure
- Consistent file naming
- Separate concerns appropriately

## 🧪 Testing

### Manual Testing Checklist

Before submitting, ensure:

- [ ] Template installs without errors
- [ ] Development server starts successfully
- [ ] All scripts work as expected
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile/desktop
- [ ] Accessibility features work (if applicable)
- [ ] Production build completes successfully

### Automated Testing

```bash
# Run template validation
npm run validate-templates

# Check for linting errors
npm run lint

# Verify build process
npm run build
```

## 📝 Submitting Changes

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-template-name

# Make your changes
# ...

# Commit changes
git add .
git commit -m "Add [Template Name] template"

# Push to your fork
git push origin feature/your-template-name
```

### 2. Create Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Request review

### 3. PR Requirements

- Descriptive title and detailed description
- Screenshots/videos if UI changes
- Testing instructions
- Links to any related issues

### 4. Review Process

- Automated checks must pass
- At least one maintainer review required
- Address any requested changes
- Squash commits before merge

## 🐛 Reporting Issues

### Bug Reports

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug-report.md) and include:

- Template name and version
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots/logs

### Feature Requests

Use [GitHub Discussions](https://github.com/Subhan-Haider/Codiner-Template/discussions) for:

- New template suggestions
- Feature enhancements
- General questions

## 🎉 Recognition

Contributors will be:
- Listed in template README acknowledgments
- Added to contributors list
- Recognized in release notes
- Eligible for repository maintainer status

## 📞 Getting Help

- **Discussions**: General questions and suggestions
- **Issues**: Bug reports and specific problems
- **Pull Requests**: Code contributions and reviews

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Codiner Community Templates! 🎉