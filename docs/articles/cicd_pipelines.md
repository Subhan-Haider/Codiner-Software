# Shipping Fast: CI/CD with GitHub Actions

![CI/CD Workflow](docker_cicd_pipeline_infographic)

Velocity is a superpower in software engineering. Codiner’s **CI/CD (Continuous Integration / Continuous Deployment)** integration ensures that your code is tested, built, and deployed automatically every time you push to GitHub.

## What is CI/CD?

- **Continuous Integration (CI)**: Automatically running tests every time you make a change to catch bugs early.
- **Continuous Deployment (CD)**: Automatically pushing your "passed" code to your production server so your users always have the latest version.

## Automated Workflows

Codiner can automatically generate `.github/workflows` files for your project. These scripts tell GitHub exactly how to handle your code.

### Our Standard Pipeline:
1. **The Guard**: Runs linting and unit tests to ensure code quality.
2. **The Builder**: Compiles your production code and prepares assets.
3. **The Deployer**: Syncs your code with Vercel, Netlify, or your own Docker server.

## Why Use CI/CD?

Moving your deployment logic to the cloud means you can deploy from anywhere—even your phone—by simply merging a pull request. It creates a collaborative environment where team members can verify each other's work without manually running shell scripts.

Stop manually uploading files and start shipping with automation.
