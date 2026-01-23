import React, { useState, useEffect } from "react";
import { usePrompts } from "@/hooks/usePrompts";
import {
  CreatePromptDialog,
  CreateOrEditPromptDialog,
} from "@/components/CreatePromptDialog";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useDeepLink } from "@/contexts/DeepLinkContext";
import { AddPromptDeepLinkData } from "@/ipc/deep_link_data";
import { showInfo } from "@/lib/toast";

import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LibraryPage() {
  const { prompts, isLoading, createPrompt, updatePrompt, deletePrompt } =
    usePrompts();
  const { lastDeepLink, clearLastDeepLink } = useDeepLink();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<
    | {
      title: string;
      description: string;
      content: string;
    }
    | undefined
  >(undefined);

  useEffect(() => {
    const handleDeepLink = async () => {
      if (lastDeepLink?.type === "add-prompt") {
        const deepLink = lastDeepLink as AddPromptDeepLinkData;
        const payload = deepLink.payload;
        showInfo(`Prefilled prompt: ${payload.title}`);
        setPrefillData({
          title: payload.title,
          description: payload.description,
          content: payload.content,
        });
        setDialogOpen(true);
        clearLastDeepLink();
      }
    };
    handleDeepLink();
  }, [lastDeepLink?.timestamp, clearLastDeepLink]);

  // Create default starter prompts if library is empty
  useEffect(() => {
    const createDefaultPrompts = async () => {
      if (!isLoading && prompts.length === 0) {
        const defaultPrompts = [
          {
            title: "Code Review",
            description: "Request a thorough code review with best practices",
            content: "Please review this code for:\n- Code quality and readability\n- Performance optimizations\n- Security vulnerabilities\n- Best practices\n- Potential bugs\n\nProvide specific suggestions for improvement."
          },
          {
            title: "Bug Fix Assistant",
            description: "Help debug and fix issues in your code",
            content: "I'm experiencing a bug. Please help me:\n1. Identify the root cause\n2. Explain why it's happening\n3. Provide a fix with explanation\n4. Suggest how to prevent similar issues\n\nHere's the problematic code:"
          },
          {
            title: "Add Documentation",
            description: "Generate comprehensive documentation",
            content: "Please add comprehensive documentation to this code including:\n- Function/class descriptions\n- Parameter explanations\n- Return value details\n- Usage examples\n- Edge cases and error handling\n\nUse JSDoc/TSDoc format."
          },
          {
            title: "Refactor Code",
            description: "Improve code structure and maintainability",
            content: "Please refactor this code to:\n- Improve readability\n- Follow SOLID principles\n- Reduce complexity\n- Enhance maintainability\n- Keep the same functionality\n\nExplain each change you make."
          },
          {
            title: "Write Tests",
            description: "Generate unit tests for your code",
            content: "Please write comprehensive unit tests for this code:\n- Cover all main functionality\n- Include edge cases\n- Test error handling\n- Use appropriate assertions\n- Follow testing best practices\n\nUse [testing framework name] format."
          },
          {
            title: "Explain Code",
            description: "Get detailed explanations of complex code",
            content: "Please explain this code in detail:\n- What it does\n- How it works\n- Key concepts used\n- Why certain approaches were chosen\n- Potential improvements\n\nMake it easy to understand for someone new to this codebase."
          },
          {
            title: "Performance Optimization",
            description: "Optimize code for better performance",
            content: "Please analyze this code for performance improvements:\n- Identify bottlenecks\n- Suggest optimizations\n- Reduce time complexity\n- Minimize memory usage\n- Improve algorithm efficiency\n\nProvide before/after comparisons with explanations."
          },
          {
            title: "API Design",
            description: "Design or improve API endpoints",
            content: "Please help design/improve this API:\n- RESTful best practices\n- Proper HTTP methods and status codes\n- Request/response structure\n- Error handling\n- Authentication/authorization\n- Rate limiting considerations\n\nProvide OpenAPI/Swagger documentation."
          },
          {
            title: "Database Query Optimization",
            description: "Optimize database queries and schema",
            content: "Please optimize this database query/schema:\n- Improve query performance\n- Add appropriate indexes\n- Reduce N+1 queries\n- Optimize joins\n- Suggest caching strategies\n\nExplain the performance impact of each change."
          },
          {
            title: "Security Audit",
            description: "Identify and fix security vulnerabilities",
            content: "Please perform a security audit on this code:\n- SQL injection vulnerabilities\n- XSS (Cross-Site Scripting)\n- CSRF protection\n- Authentication/authorization issues\n- Data validation\n- Sensitive data exposure\n\nProvide secure alternatives for any issues found."
          },
          {
            title: "Accessibility Improvements",
            description: "Make UI components accessible (WCAG compliant)",
            content: "Please improve accessibility for this component:\n- ARIA labels and roles\n- Keyboard navigation\n- Screen reader support\n- Color contrast\n- Focus management\n- Semantic HTML\n\nEnsure WCAG 2.1 AA compliance."
          },
          {
            title: "Error Handling",
            description: "Add robust error handling",
            content: "Please add comprehensive error handling:\n- Try-catch blocks where needed\n- Meaningful error messages\n- Proper error propagation\n- Logging strategy\n- User-friendly error display\n- Recovery mechanisms\n\nFollow error handling best practices."
          },
          {
            title: "TypeScript Migration",
            description: "Convert JavaScript to TypeScript",
            content: "Please convert this JavaScript code to TypeScript:\n- Add proper type annotations\n- Define interfaces/types\n- Use generics where appropriate\n- Enable strict mode compatibility\n- Maintain functionality\n\nExplain type choices made."
          },
          {
            title: "React Component",
            description: "Create a React component from requirements",
            content: "Please create a React component with:\n- TypeScript types\n- Props interface\n- State management (if needed)\n- Proper hooks usage\n- Accessibility features\n- Responsive design\n- Clean, maintainable code\n\nRequirements:"
          },
          {
            title: "CSS/Styling Improvements",
            description: "Improve styling and responsiveness",
            content: "Please improve the styling for this component:\n- Modern CSS best practices\n- Responsive design (mobile-first)\n- Flexbox/Grid layout\n- Consistent spacing\n- Theme variables\n- Dark mode support\n\nUse Tailwind CSS / CSS Modules / Styled Components."
          },
          {
            title: "Code to Comments",
            description: "Add inline comments explaining logic",
            content: "Please add clear inline comments to this code:\n- Explain complex logic\n- Document assumptions\n- Clarify non-obvious decisions\n- Add TODO/FIXME where appropriate\n- Keep comments concise and relevant\n\nDon't over-comment obvious code."
          },
          {
            title: "Algorithm Implementation",
            description: "Implement a specific algorithm",
            content: "Please implement this algorithm:\n- Clean, readable code\n- Optimal time/space complexity\n- Handle edge cases\n- Add comments explaining approach\n- Include usage examples\n\nAlgorithm to implement:"
          },
          {
            title: "Git Commit Message",
            description: "Generate conventional commit messages",
            content: "Please generate a conventional commit message for these changes:\n\nFormat:\ntype(scope): subject\n\nbody (optional)\n\nfooter (optional)\n\nTypes: feat, fix, docs, style, refactor, test, chore\n\nChanges made:"
          }
        ];

        try {
          for (const prompt of defaultPrompts) {
            await createPrompt(prompt);
          }
        } catch (error) {
          console.error("Failed to create default prompts:", error);
        }
      }
    };

    createDefaultPrompts();
  }, [isLoading, prompts.length, createPrompt]);

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Clear prefill data when dialog closes
      setPrefillData(undefined);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full p-8 md:p-12 overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Library</h1>
              <p className="text-muted-foreground">
                Create and manage reusable prompts for your workflows.
              </p>
            </div>
            <CreateOrEditPromptDialog
              mode="create"
              onCreatePrompt={createPrompt}
              prefillData={prefillData}
              isOpen={dialogOpen}
              onOpenChange={handleDialogClose}
              trigger={
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Prompt
                </Button>
              }
            />
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <span className="text-sm">Loading prompts...</span>
          </div>
        ) : prompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No prompts yet</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              Create reusable prompts to speed up your specific tasks.
            </p>
            <Button
              onClick={() => setDialogOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Your First Prompt
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {prompts.map((p) => (
              <PromptCard
                key={p.id}
                prompt={p}
                onUpdate={updatePrompt}
                onDelete={deletePrompt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PromptCard({
  prompt,
  onUpdate,
  onDelete,
}: {
  prompt: {
    id: number;
    title: string;
    description: string | null;
    content: string;
  };
  onUpdate: (p: {
    id: number;
    title: string;
    description?: string;
    content: string;
  }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  return (
    <div
      data-testid="prompt-card"
      className="border border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-all duration-200 group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">{prompt.title}</h3>
            {prompt.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {prompt.description}
              </p>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <CreateOrEditPromptDialog
              mode="edit"
              prompt={prompt}
              onUpdatePrompt={onUpdate}
            />
            <DeleteConfirmationDialog
              itemName={prompt.title}
              itemType="Prompt"
              onDelete={() => onDelete(prompt.id)}
            />
          </div>
        </div>
        <pre className="text-sm whitespace-pre-wrap bg-muted/50 border border-border rounded-lg p-3 max-h-48 overflow-auto font-mono">
          {prompt.content}
        </pre>
      </div>
    </div>
  );
}
