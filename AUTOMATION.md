# Automation Features

This document describes all the automated workflows and processes in the Codiner project.

## Table of Contents

- [Continuous Integration](#continuous-integration)
- [Release Automation](#release-automation)
- [Dependency Management](#dependency-management)
- [Security Automation](#security-automation)
- [PR Management](#pr-management)
- [Issue Management](#issue-management)
- [Quality Assurance](#quality-assurance)

---

## Continuous Integration

### CI Workflow (`ci.yml`)
**Trigger:** Push to main, Pull requests
**Actions:**
- Runs on Windows and macOS with 4 parallel shards
- Presubmit checks (lint, format) - macOS only
- TypeScript type checking - macOS only
- Unit tests - macOS only
- E2E tests with Playwright - All platforms
- Merges test reports and uploads artifacts

### Build All Platforms (`build-all.yml`)
**Trigger:** Push to main, Tagged releases, Manual
**Actions:**
- Builds for Windows, macOS, and Ubuntu
- Creates distributable packages (.exe, .dmg, .deb, etc.)
- Uploads build artifacts
- Creates GitHub releases for tags

### Android Build (`android.yml`)
**Trigger:** Push to main, Pull requests, Manual
**Actions:**
- Builds mobile web assets
- Syncs with Capacitor
- Builds Android APK
- Uploads APK artifact

---

## Release Automation

### Release Workflow (`release.yml`)
**Trigger:** Git tags (v*)
**Actions:**
- Builds for all platforms and architectures
- Signs and notarizes macOS builds
- Creates GitHub release with all artifacts
- Generates release notes

### Changelog Generation (`changelog.yml`) 🆕
**Trigger:** Published releases, Manual
**Actions:**
- Automatically categorizes commits (features, fixes, docs, chores)
- Updates CHANGELOG.md file
- Enhances GitHub release notes
- Commits changelog updates to main branch

---

## Dependency Management

### Dependabot (`dependabot.yml`)
**Trigger:** Weekly schedule
**Actions:**
- Checks for npm package updates
- Checks for GitHub Actions updates
- Opens PRs for dependency updates (max 10 at a time)
- Groups dependencies together

### Dependabot Auto-Merge (`dependabot-auto-merge.yml`) 🆕
**Trigger:** Dependabot PRs opened/synchronized
**Actions:**
- Automatically approves patch and minor version updates
- Enables auto-merge for safe updates
- Major versions require manual review

### Auto-Update Check (`auto-update-check.yml`) 🆕
**Trigger:** Weekly on Mondays, Manual
**Actions:**
- Scans for outdated packages
- Categorizes updates by severity (critical, major, minor)
- Creates/updates tracking issue with update summary
- Helps prioritize dependency maintenance

---

## Security Automation

### CodeQL Analysis (`codeql.yml`)
**Trigger:** Push to main, Pull requests, Weekly on Fridays
**Actions:**
- Scans JavaScript/TypeScript code for security vulnerabilities
- Reports findings to GitHub Security tab
- Helps prevent common security issues

### Security Audit (`security-audit.yml`) 🆕
**Trigger:** Daily at 2 AM UTC, Dependency changes in PRs, Manual
**Actions:**
- Runs `npm audit` to find vulnerabilities
- Comments on PRs with vulnerability details
- Creates issues for critical/high severity vulnerabilities
- Provides remediation guidance

---

## PR Management

### PR Labeler (`labeler.yml`)
**Trigger:** Pull requests opened/synchronized
**Actions:**
- Automatically labels PRs based on changed files:
  - `frontend` - src/renderer changes
  - `backend` - src/main, src/ipc changes
  - `documentation` - Markdown file changes
  - `dependencies` - package.json/lock changes
  - `database` - Drizzle/SQL changes
  - `testing` - Test file changes
  - `configuration` - Config file changes
  - `mobile` - Android/Capacitor changes
  - `templates` - Template directory changes
  - `security` - Security-related changes

### PR Size Labeler (`pr-size-labeler.yml`) 🆕
**Trigger:** Pull requests opened/synchronized/reopened
**Actions:**
- Calculates total lines changed
- Adds size label (XS, S, M, L, XL)
- Comments on very large PRs (1000+ lines)
- Encourages breaking up large changes

### PR Title Linter (`pr-title-lint.yml`) 🆕
**Trigger:** Pull requests opened/edited
**Actions:**
- Validates PR titles follow Conventional Commits format
- Comments with guidance if title doesn't match
- Removes comment when title is corrected
- Helps maintain clean commit history

### PR Status Manager (`pr-status.yml`) 🆕
**Trigger:** PR opened/ready for review, Reviews submitted
**Actions:**
- Manages status labels:
  - `work-in-progress` - Draft PRs
  - `needs-review` - Ready for review
  - `changes-requested` - Reviewer requested changes
  - `approved` - All reviewers approved
- Automatically updates based on review state

### Merge Conflict Checker (`check-conflicts.yml`) 🆕
**Trigger:** Pull requests opened/synchronized
**Actions:**
- Checks for merge conflicts
- Adds `merge-conflict` label
- Comments with resolution instructions
- Removes label when conflicts are resolved

### Auto Assign Reviewers (`auto-assign-reviewers.yml`) 🆕
**Trigger:** Pull requests opened/ready for review
**Actions:**
- Assigns reviewers based on changed files
- Uses code ownership patterns
- Skips bot PRs and already-assigned PRs

### Claude PR Review (`claude-pr-review.yml`)
**Trigger:** Pull requests
**Actions:**
- AI-powered code review using Claude
- Provides intelligent feedback on changes

### Playwright Comment (`playwright-comment.yml`)
**Trigger:** CI workflow completion
**Actions:**
- Posts E2E test results as PR comment
- Links to detailed HTML report
- Shows pass/fail summary

---

## Issue Management

### Issue Triage (`triage-issues.yml`)
**Trigger:** New issues opened
**Actions:**
- AI-powered issue classification
- Adds relevant labels
- Routes to appropriate team members

### Auto Label Issues (`auto-label-issues.yml`) 🆕
**Trigger:** New issues opened
**Actions:**
- Analyzes issue title and body
- Automatically adds relevant labels:
  - `bug`, `enhancement`, `question`, `documentation`
  - `performance`, `security`
  - Platform labels (windows, macos, linux, android)
  - Component labels (frontend, backend, database, ai)
- Adds `needs-triage` label to all new issues

### Duplicate Issue Detection (`duplicate-issues.yml`)
**Trigger:** New issues opened
**Actions:**
- AI-powered duplicate detection using Claude
- Comments on potential duplicates with confidence ratings
- Helps reduce duplicate issues

### Stale Issues/PRs (`stale.yml`)
**Trigger:** Daily at 1:30 AM UTC
**Actions:**
- Marks issues stale after 30 days of inactivity
- Marks PRs stale after 45 days of inactivity
- Closes stale items after additional waiting period
- Helps maintain clean issue tracker

### Lock Resolved Issues (`lock-issues.yml`) 🆕
**Trigger:** Daily at 3 AM UTC, Manual
**Actions:**
- Locks issues inactive for 60 days after closure
- Locks PRs inactive for 60 days after closure
- Prevents necroposting on resolved issues
- Encourages opening new issues for related problems

### Auto Close Linked Issues (`auto-close-issues.yml`) 🆕
**Trigger:** PRs merged
**Actions:**
- Detects issue references (fixes #123, closes #123, resolves #123)
- Automatically closes linked issues
- Adds comment linking to the PR
- Keeps issue tracker up to date

### Welcome First-Time Contributors (`welcome.yml`) 🆕
**Trigger:** First issue or PR from a user
**Actions:**
- Welcomes new contributors
- Provides guidance on what to expect
- Links to contribution guidelines
- Adds `first-time-contributor` label to PRs

---

## Quality Assurance

### Template Validation (`template-validation.yml`)
**Trigger:** Changes to community-templates/
**Actions:**
- Validates template structure
- Checks for required files
- Verifies package.json syntax
- Updates template count in README

### Performance Monitoring (`performance.yml`) 🆕
**Trigger:** PRs with code changes, Push to main, Manual
**Actions:**
- Measures type checking time
- Measures test execution time
- Measures build time
- Tracks packaged app size
- Comments metrics on PRs
- Saves metrics as artifacts for trending

### Bundle Size Check (`bundle-size.yml`) 🆕
**Trigger:** PRs with code/config changes
**Actions:**
- Builds PR and base versions
- Compares packaged application sizes
- Comments size comparison on PR
- Helps catch unexpected size increases

### Documentation Links (`check-links.yml`) 🆕
**Trigger:** Weekly on Sundays, PRs with doc changes, Manual
**Actions:**
- Checks all markdown files for broken links
- Comments on PRs with broken links
- Creates issues for scheduled checks
- Maintains documentation quality

---

## Pre-commit Automation

### Husky Pre-commit Hook
**Trigger:** Every git commit
**Actions:**
- Runs `lint-staged` on staged files
- Lints changed JavaScript/TypeScript files with oxlint
- Formats changed files with Prettier
- Prevents committing code that doesn't meet standards

---

## Summary of New Automations 🆕

The following workflows have been newly added to enhance automation:

1. **dependabot-auto-merge.yml** - Auto-merges safe dependency updates
2. **changelog.yml** - Generates changelog on releases
3. **performance.yml** - Monitors build and test performance
4. **bundle-size.yml** - Tracks application bundle size
5. **auto-update-check.yml** - Weekly dependency update summary
6. **security-audit.yml** - Daily security vulnerability scanning
7. **pr-size-labeler.yml** - Labels PRs by size
8. **pr-title-lint.yml** - Enforces conventional commit format
9. **pr-status.yml** - Manages PR status labels
10. **check-conflicts.yml** - Detects and alerts on merge conflicts
11. **auto-assign-reviewers.yml** - Assigns reviewers based on file changes
12. **auto-label-issues.yml** - Auto-labels issues based on content
13. **auto-close-issues.yml** - Closes issues when linked PRs merge
14. **welcome.yml** - Welcomes first-time contributors
15. **lock-issues.yml** - Locks old resolved issues
16. **check-links.yml** - Validates documentation links

---

## Configuring Automation

### Adding Code Owners for Auto-Assignment

Edit `.github/workflows/auto-assign-reviewers.yml` and add GitHub usernames:

```yaml
const codeOwners = {
  'frontend': {
    paths: ['src/renderer/', 'src/components/', '.tsx', '.css'],
    reviewers: ['username1', 'username2']  # Add your team members
  },
  # ... more areas
};
```

### Customizing Stale Timeouts

Edit `.github/workflows/stale.yml`:

```yaml
days-before-stale: 30        # Change issue stale threshold
days-before-pr-stale: 45     # Change PR stale threshold
days-before-close: 5         # Days before closing after stale
```

### Adjusting PR Size Thresholds

Edit `.github/workflows/pr-size-labeler.yml`:

```javascript
if (totalChanges < 10) {
  sizeLabel = 'size/XS';
} else if (totalChanges < 50) {
  sizeLabel = 'size/S';
}
// ... adjust as needed
```

---

## Monitoring Automation

### View Workflow Runs
Visit: `https://github.com/Subhan-Haider/Codiner-Software/actions`

### Check Scheduled Workflows
- Security audits: Daily at 2 AM UTC
- Update checks: Mondays at 9 AM UTC
- Link checks: Sundays at 4 AM UTC
- Stale issues: Daily at 1:30 AM UTC
- Lock issues: Daily at 3 AM UTC

### Workflow Artifacts
Many workflows save artifacts for 30 days:
- Performance metrics
- Bundle size reports
- Test reports
- Build artifacts

---

## Troubleshooting

### Workflow Failing?
1. Check the Actions tab for detailed logs
2. Review the specific workflow file in `.github/workflows/`
3. Ensure required secrets are configured (if applicable)

### Auto-merge Not Working?
1. Verify branch protection rules allow auto-merge
2. Check that required status checks are passing
3. Ensure Dependabot has necessary permissions

### Labels Not Applying?
1. Verify the label exists in repository settings
2. Check the labeler configuration in `.github/labeler.yml`
3. Review workflow permissions

---

## Contributing to Automation

When adding new workflows:

1. Follow existing patterns and naming conventions
2. Add appropriate comments and documentation
3. Use concurrency controls to prevent duplicate runs
4. Test thoroughly before merging
5. Update this documentation

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)

---

*Last updated: 2026-02-19*
