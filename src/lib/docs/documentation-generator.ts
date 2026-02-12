/**
 * Auto-Documentation Generator
 * Analyzes project structure and generates comprehensive documentation
 */

import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import log from "electron-log";

const execAsync = promisify(exec);
const logger = log.scope("doc-generator");

interface ProjectStructure {
    name: string;
    type: "file" | "directory";
    path: string;
    children?: ProjectStructure[];
    size?: number;
    extension?: string;
}

interface ProjectAnalysis {
    name: string;
    description: string;
    framework: string;
    language: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    scripts: Record<string, string>;
    structure: ProjectStructure;
    fileCount: number;
    totalSize: number;
}

interface DocumentationSet {
    readme: string;
    apiDocs: string;
    architecture: string;
    setup: string;
    structure: string;
    contributing?: string;
}

/**
 * Analyze project structure recursively
 */
export async function analyzeProjectStructure(
    projectPath: string,
    maxDepth = 3,
    currentDepth = 0,
    ignorePatterns = ["node_modules", ".git", "dist", "build", ".next", "coverage"],
): Promise<ProjectStructure> {
    const stats = await fs.stat(projectPath);
    const name = path.basename(projectPath);

    if (stats.isFile()) {
        return {
            name,
            type: "file",
            path: projectPath,
            size: stats.size,
            extension: path.extname(name),
        };
    }

    const structure: ProjectStructure = {
        name,
        type: "directory",
        path: projectPath,
        children: [],
    };

    if (currentDepth >= maxDepth) {
        return structure;
    }

    try {
        const entries = await fs.readdir(projectPath);

        for (const entry of entries) {
            // Skip ignored patterns
            if (ignorePatterns.some((pattern) => entry.includes(pattern))) {
                continue;
            }

            const fullPath = path.join(projectPath, entry);
            try {
                const childStructure = await analyzeProjectStructure(
                    fullPath,
                    maxDepth,
                    currentDepth + 1,
                    ignorePatterns,
                );
                structure.children?.push(childStructure);
            } catch (error) {
                // Skip files we can't access
                logger.warn(`Skipping ${fullPath}:`, error);
            }
        }
    } catch (error) {
        logger.error(`Error reading directory ${projectPath}:`, error);
    }

    return structure;
}

/**
 * Analyze package.json
 */
export async function analyzePackageJson(
    projectPath: string,
): Promise<Partial<ProjectAnalysis>> {
    try {
        const packageJsonPath = path.join(projectPath, "package.json");
        const content = await fs.readFile(packageJsonPath, "utf-8");
        const pkg = JSON.parse(content);

        return {
            name: pkg.name || path.basename(projectPath),
            description: pkg.description || "",
            dependencies: pkg.dependencies || {},
            devDependencies: pkg.devDependencies || {},
            scripts: pkg.scripts || {},
        };
    } catch (error) {
        logger.warn("No package.json found or error reading it");
        return {
            name: path.basename(projectPath),
            description: "",
            dependencies: {},
            devDependencies: {},
            scripts: {},
        };
    }
}

/**
 * Detect project framework and language
 */
export function detectFrameworkAndLanguage(
    dependencies: Record<string, string>,
    devDependencies: Record<string, string>,
    structure: ProjectStructure,
): { framework: string; language: string } {
    const allDeps = { ...dependencies, ...devDependencies };

    // Detect framework
    let framework = "Unknown";
    if (allDeps["next"]) framework = "Next.js";
    else if (allDeps["react"]) framework = "React";
    else if (allDeps["vue"]) framework = "Vue";
    else if (allDeps["@angular/core"]) framework = "Angular";
    else if (allDeps["svelte"]) framework = "Svelte";
    else if (allDeps["express"]) framework = "Express";
    else if (allDeps["fastify"]) framework = "Fastify";
    else if (allDeps["nestjs"]) framework = "NestJS";
    else if (allDeps["electron"]) framework = "Electron";

    // Detect language
    let language = "JavaScript";
    if (allDeps["typescript"] || devDependencies["typescript"]) {
        language = "TypeScript";
    }

    return { framework, language };
}

/**
 * Generate README.md
 */
export async function generateReadme(
    analysis: ProjectAnalysis,
    ollamaHost = "http://localhost:11434",
): Promise<string> {
    const prompt = `Generate a professional README.md for this project:

Project Name: ${analysis.name}
Description: ${analysis.description}
Framework: ${analysis.framework}
Language: ${analysis.language}

Key Dependencies:
${Object.entries(analysis.dependencies)
            .slice(0, 10)
            .map(([name, version]) => `- ${name}: ${version}`)
            .join("\n")}

Available Scripts:
${Object.entries(analysis.scripts)
            .map(([name, cmd]) => `- ${name}: ${cmd}`)
            .join("\n")}

Generate a comprehensive README with:
1. Project title and description
2. Features section
3. Installation instructions
4. Usage examples
5. Scripts documentation
6. Tech stack
7. Contributing guidelines
8. License

Use markdown format with emojis. Be professional and clear.`;

    try {
        const response = await fetch(`${ollamaHost}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder:7b",
                prompt,
                stream: false,
                options: { temperature: 0.7 },
            }),
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        logger.error("Failed to generate README with AI:", error);
        return generateFallbackReadme(analysis);
    }
}

/**
 * Generate fallback README if AI fails
 */
function generateFallbackReadme(analysis: ProjectAnalysis): string {
    return `# ${analysis.name}

${analysis.description}

## 🚀 Tech Stack

- **Framework**: ${analysis.framework}
- **Language**: ${analysis.language}

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🏃 Usage

\`\`\`bash
npm start
\`\`\`

## 📜 Scripts

${Object.entries(analysis.scripts)
            .map(([name, cmd]) => `- \`npm run ${name}\` - ${cmd}`)
            .join("\n")}

## 📝 License

MIT
`;
}

/**
 * Generate project structure documentation
 */
export function generateStructureDoc(structure: ProjectStructure): string {
    const lines: string[] = [
        "# 📁 Project Structure",
        "",
        "```",
        generateStructureTree(structure, "", true),
        "```",
        "",
        "## Directory Descriptions",
        "",
    ];

    const descriptions = generateDirectoryDescriptions(structure);
    lines.push(...descriptions);

    return lines.join("\n");
}

/**
 * Generate tree structure
 */
function generateStructureTree(
    node: ProjectStructure,
    prefix = "",
    isLast = true,
): string {
    const lines: string[] = [];
    const connector = isLast ? "└── " : "├── ";
    const icon = node.type === "directory" ? "📁" : "📄";

    lines.push(`${prefix}${connector}${icon} ${node.name}`);

    if (node.children && node.children.length > 0) {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        node.children.forEach((child, index) => {
            const childIsLast = index === node.children!.length - 1;
            lines.push(generateStructureTree(child, newPrefix, childIsLast));
        });
    }

    return lines.join("\n");
}

/**
 * Generate directory descriptions
 */
function generateDirectoryDescriptions(structure: ProjectStructure): string[] {
    const descriptions: string[] = [];
    const commonDirs: Record<string, string> = {
        src: "Source code directory containing the main application code",
        components: "Reusable UI components",
        pages: "Application pages/routes",
        lib: "Utility functions and libraries",
        utils: "Helper functions and utilities",
        hooks: "Custom React hooks",
        api: "API routes and endpoints",
        styles: "CSS/SCSS stylesheets",
        public: "Static assets (images, fonts, etc.)",
        tests: "Test files and test utilities",
        docs: "Project documentation",
        scripts: "Build and deployment scripts",
        config: "Configuration files",
    };

    if (structure.children) {
        for (const child of structure.children) {
            if (child.type === "directory") {
                const desc = commonDirs[child.name] || "Project directory";
                descriptions.push(`### \`${child.name}/\``);
                descriptions.push(desc);
                descriptions.push("");
            }
        }
    }

    return descriptions;
}

/**
 * Generate setup instructions
 */
export function generateSetupDoc(analysis: ProjectAnalysis): string {
    const hasTypeScript = analysis.language === "TypeScript";
    const framework = analysis.framework;

    return `# ⚙️ Setup Instructions

## Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher${hasTypeScript ? "\n- **TypeScript**: Included in dependencies" : ""}

## Installation Steps

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd ${analysis.name}
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

${hasTypeScript
            ? `### 3. TypeScript Setup

TypeScript is already configured. The \`tsconfig.json\` file contains the compiler options.

\`\`\`bash
# Type checking
npm run type-check
\`\`\`
`
            : ""
        }

### ${hasTypeScript ? "4" : "3"}. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Add your environment variables here
# Example:
# API_URL=http://localhost:3000
# DATABASE_URL=postgresql://...
\`\`\`

### ${hasTypeScript ? "5" : "4"}. Run Development Server

\`\`\`bash
${analysis.scripts.dev || analysis.scripts.start || "npm start"}
\`\`\`

The application will be available at \`http://localhost:3000\` (or the port specified in your configuration).

## Build for Production

\`\`\`bash
${analysis.scripts.build || "npm run build"}
\`\`\`

## Run Tests

\`\`\`bash
${analysis.scripts.test || "npm test"}
\`\`\`

## Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":

\`\`\`bash
# Kill the process using the port
${process.platform === "win32" ? "netstat -ano | findstr :3000" : "lsof -ti:3000 | xargs kill"}
\`\`\`

### Module Not Found

If you see "Module not found" errors:

\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### TypeScript Errors

\`\`\`bash
# Rebuild TypeScript
${hasTypeScript ? "npm run build" : "# Not applicable - project uses JavaScript"}
\`\`\`
`;
}

/**
 * Generate architecture documentation
 */
export async function generateArchitectureDoc(
    analysis: ProjectAnalysis,
    ollamaHost = "http://localhost:11434",
): Promise<string> {
    const prompt = `Generate architecture documentation for this ${analysis.framework} project:

Project: ${analysis.name}
Framework: ${analysis.framework}
Language: ${analysis.language}

Key Dependencies:
${Object.keys(analysis.dependencies).slice(0, 15).join(", ")}

Explain:
1. Overall architecture pattern (MVC, Component-based, etc.)
2. Data flow
3. Key technologies and their roles
4. Folder organization philosophy
5. Design patterns used

Be technical but clear. Use markdown format.`;

    try {
        const response = await fetch(`${ollamaHost}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder:7b",
                prompt,
                stream: false,
                options: { temperature: 0.6 },
            }),
        });

        const data = await response.json();
        return `# 🏗️ Architecture\n\n${data.response}`;
    } catch (error) {
        logger.error("Failed to generate architecture doc:", error);
        return generateFallbackArchitectureDoc(analysis);
    }
}

/**
 * Generate fallback architecture doc
 */
function generateFallbackArchitectureDoc(analysis: ProjectAnalysis): string {
    return `# 🏗️ Architecture

## Overview

This is a **${analysis.framework}** application built with **${analysis.language}**.

## Tech Stack

- **Framework**: ${analysis.framework}
- **Language**: ${analysis.language}
- **Package Manager**: npm

## Key Dependencies

${Object.entries(analysis.dependencies)
            .slice(0, 10)
            .map(([name, version]) => `- **${name}**: ${version}`)
            .join("\n")}

## Architecture Pattern

This project follows modern ${analysis.framework} best practices with a component-based architecture.
`;
}

/**
 * Generate complete documentation set
 */
export async function generateFullDocumentation(
    projectPath: string,
    ollamaHost = "http://localhost:11434",
): Promise<DocumentationSet> {
    logger.info(`Generating documentation for: ${projectPath}`);

    // Analyze project
    const packageInfo = await analyzePackageJson(projectPath);
    const structure = await analyzeProjectStructure(projectPath);
    const { framework, language } = detectFrameworkAndLanguage(
        packageInfo.dependencies || {},
        packageInfo.devDependencies || {},
        structure,
    );

    const analysis: ProjectAnalysis = {
        name: packageInfo.name || "Project",
        description: packageInfo.description || "",
        framework,
        language,
        dependencies: packageInfo.dependencies || {},
        devDependencies: packageInfo.devDependencies || {},
        scripts: packageInfo.scripts || {},
        structure,
        fileCount: 0,
        totalSize: 0,
    };

    // Generate all documentation
    const [readme, architecture] = await Promise.all([
        generateReadme(analysis, ollamaHost),
        generateArchitectureDoc(analysis, ollamaHost),
    ]);

    const setup = generateSetupDoc(analysis);
    const structureDoc = generateStructureDoc(structure);

    return {
        readme,
        apiDocs: "", // Can be extended later
        architecture,
        setup,
        structure: structureDoc,
    };
}

/**
 * Save documentation to files
 */
export async function saveDocumentation(
    projectPath: string,
    docs: DocumentationSet,
): Promise<void> {
    const docsDir = path.join(projectPath, "docs");

    // Create docs directory if it doesn't exist
    try {
        await fs.mkdir(docsDir, { recursive: true });
    } catch (error) {
        // Directory might already exist
    }

    // Save files
    await Promise.all([
        fs.writeFile(path.join(projectPath, "README.md"), docs.readme),
        fs.writeFile(path.join(docsDir, "ARCHITECTURE.md"), docs.architecture),
        fs.writeFile(path.join(docsDir, "SETUP.md"), docs.setup),
        fs.writeFile(path.join(docsDir, "STRUCTURE.md"), docs.structure),
    ]);

    logger.info("Documentation saved successfully");
}
