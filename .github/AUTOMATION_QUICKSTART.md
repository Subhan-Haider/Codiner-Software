# Quick Start: Understanding Codiner Automation

## For Contributors

### Before You Start

All automation is handled by GitHub Actions - no local setup required!

### Opening a Pull Request

1. **Title Format**: Use conventional commits
   - ✅ `feat: add dark mode`
   - ✅ `fix(auth): resolve login issue`
   - ❌ `Added some stuff`

2. **Link Issues**: Reference issues in your PR description
   - Use `Fixes #123` or `Closes #456`
   - Issues will auto-close when PR merges

3. **Watch for Labels**: PRs are auto-labeled based on:
   - Changed files (frontend, backend, etc.)
   - PR size (XS to XL)
   - Review status (needs-review, approved, etc.)

### What Happens Automatically

✅ **On PR Open**:

- Size label added
- Reviewers assigned (if configured)
- Title format checked
- Labels applied based on files

✅ **During Review**:

- Status labels updated
- Merge conflicts detected
- CI tests run on Windows & macOS

✅ **On PR Merge**:

- Linked issues closed
- Changelog updated (on releases)

## For Maintainers

### Daily Automated Tasks

| Time (UTC) | Task                       |
| ---------- | -------------------------- |
| 01:30      | Check for stale issues/PRs |
| 02:00      | Run security audit         |
| 03:00      | Lock old resolved issues   |

### Weekly Automated Tasks

| Day          | Task                      |
| ------------ | ------------------------- |
| Sunday 04:00 | Check documentation links |
| Monday 09:00 | Check for package updates |
| Weekly       | Dependabot updates        |

### Monitoring Automation

View all workflow runs: https://github.com/Subhan-Haider/Codiner-Software/actions

### Key Workflows to Monitor

1. **CI** - Core testing pipeline
2. **Security Audit** - Vulnerability reports
3. **Performance** - Build time tracking
4. **Dependabot** - Dependency updates

### Commands

```bash
# Validate all workflows
npm run workflows:validate

# List all workflows
npm run workflows:list
```

## Troubleshooting

### PR Title Check Failing?

Use format: `type(scope): description`

Example: `feat: add new feature`

### Auto-merge Not Working?

- Verify branch protection rules
- Check required status checks
- Ensure it's a patch/minor update

### Labels Not Applying?

Labels must exist in repository settings first.

## Need Help?

- 📚 Full docs: [AUTOMATION.md](AUTOMATION.md)
- 🐛 Found a bug? [Open an issue](https://github.com/Subhan-Haider/Codiner-Software/issues)
- 💬 Questions? Check [Discussions](https://github.com/Subhan-Haider/Codiner-Software/discussions)
