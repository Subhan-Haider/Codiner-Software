import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateApp } from "@/hooks/useCreateApp";
import { useCheckName } from "@/hooks/useCheckName";
import { useSetAtom } from "jotai";
import { selectedAppIdAtom } from "@/atoms/appAtoms";
import { NEON_TEMPLATE_IDS, Template } from "@/shared/templates";
import { useRouter } from "@tanstack/react-router";
import { Loader2, Rocket, AlertCircle, CheckCircle2 } from "lucide-react";
import { neonTemplateHook } from "@/client_logic/template_hook";
import { showError } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreateAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | undefined;
}

export function CreateAppDialog({
  open,
  onOpenChange,
  template,
}: CreateAppDialogProps) {
  const setSelectedAppId = useSetAtom(selectedAppIdAtom);
  const [appName, setAppName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createApp } = useCreateApp();
  const { data: nameCheckResult } = useCheckName(appName);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!appName.trim() || nameCheckResult?.exists) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createApp({ name: appName.trim() });
      if (template && NEON_TEMPLATE_IDS.has(template.id)) {
        // Run template hook in background to speed up transition
        neonTemplateHook({
          appId: result.app.id,
          appName: result.app.name,
        }).catch((err) => {
          console.error("Failed to setup template-specific background tasks:", err);
        });
      }
      setSelectedAppId(result.app.id);

      // Tiny delay to ensure stability before navigation
      await new Promise((resolve) => setTimeout(resolve, 100));

      router.navigate({
        to: "/chat",
        search: { id: result.chatId },
      });
      setAppName("");
      onOpenChange(false);
    } catch (error) {
      showError(error as any);
      console.error("Error creating app:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNameValid = appName.trim().length > 0;
  const nameExists = nameCheckResult?.exists;
  const canSubmit = isNameValid && !nameExists && !isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl bg-background/95 backdrop-blur-xl">
        <div className="relative h-2 bg-primary/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isSubmitting ? "100%" : "0%" }}
            className="h-full bg-primary"
          />
        </div>

        <div className="p-8">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
                <Rocket size={28} className={cn(isSubmitting && "animate-bounce")} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">Name your creation</DialogTitle>
                <DialogDescription className="text-muted-foreground font-medium">
                  Initializing project with <span className="text-primary font-bold italic">{template?.title}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="appName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Project Identifier</Label>
              <div className="relative group">
                <Input
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. My Awesome App"
                  autoFocus
                  className={cn(
                    "h-14 px-5 text-lg rounded-2xl border-2 transition-all outline-none",
                    nameExists
                      ? "border-red-500/50 bg-red-50/10 focus:ring-red-500/20"
                      : appName.trim().length > 0 && !nameExists
                        ? "border-green-500/50 bg-green-50/10 focus:ring-green-500/20"
                        : "focus:border-primary focus:ring-primary/20 bg-muted/30"
                  )}
                  disabled={isSubmitting}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {nameExists && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-red-500">
                        <AlertCircle size={20} />
                      </motion.div>
                    )}
                    {appName.trim().length > 0 && !nameExists && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-green-500">
                        <CheckCircle2 size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <AnimatePresence>
                {nameExists && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[13px] font-semibold text-red-500/90 ml-1"
                  >
                    This name is already taken. Try something unique.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <DialogFooter className="pt-4 flex !justify-between items-center sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="rounded-xl px-6 font-semibold hover:bg-muted"
              >
                Go Back
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25 transition-all active:scale-95 disabled:grayscale"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Create App"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
