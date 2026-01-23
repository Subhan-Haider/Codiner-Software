import React, { useState } from "react";
import { ArrowRight, ExternalLink, Check, Sparkles, Zap, Beaker } from "lucide-react";
import { IpcClient } from "@/ipc/ipc_client";
import { useSettings } from "@/hooks/useSettings";
import { CommunityCodeConsentDialog } from "./CommunityCodeConsentDialog";
import { NeonRequiredDialog } from "./NeonRequiredDialog";
import type { Template } from "@/shared/templates";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { showWarning } from "@/lib/toast";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onCreateApp: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onCreateApp,
}) => {
  const { settings, updateSettings } = useSettings();
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [showNeonDialog, setShowNeonDialog] = useState(false);

  const handleCardClick = () => {
    if (!template.isOfficial && !settings?.acceptedCommunityCode) {
      setShowConsentDialog(true);
      return;
    }

    if (template.requiresNeon && !settings?.neon?.accessToken) {
      setShowNeonDialog(true);
      return;
    }

    onSelect(template.id);
  };

  const handleConsentAccept = () => {
    updateSettings({ acceptedCommunityCode: true });
    onSelect(template.id);
    setShowConsentDialog(false);
  };

  const handleConsentCancel = () => {
    setShowConsentDialog(false);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.githubUrl) {
      IpcClient.getInstance().openExternalUrl(template.githubUrl);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        onClick={handleCardClick}
        className={cn(
          "group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
          "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border",
          isSelected
            ? "border-primary shadow-2xl ring-1 ring-primary/20 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:shadow-xl"
        )}
      >
        {/* Selection Glow */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Thumbnail Area */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={template.imageUrl}
            alt={template.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
              isSelected ? "brightness-110" : "brightness-95 group-hover:brightness-100"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {template.isOfficial && (
              <span className="flex items-center gap-1 bg-blue-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg">
                <Sparkles size={12} /> Official
              </span>
            )}
            {template.isExperimental && (
              <span className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg">
                <Beaker size={12} /> Experimental
              </span>
            )}
            {!template.isOfficial && !template.isExperimental && (
              <span className="flex items-center gap-1 bg-purple-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-lg">
                <Zap size={12} /> Community
              </span>
            )}
          </div>

          {/* Selected Tick */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full shadow-xl"
              >
                <Check size={20} strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-3">
            <h3 className={cn(
              "text-xl font-bold line-clamp-1 transition-colors",
              isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
            )}>
              {template.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5 min-h-[40px] italic leading-relaxed">
              {template.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between gap-4">
            {template.githubUrl ? (
              <button
                onClick={handleGithubClick}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
              >
                GitHub <ExternalLink size={14} />
              </button>
            ) : <div />}

            <AnimatePresence mode="wait">
              {isSelected ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreateApp();
                    }}
                    size="sm"
                    className="rounded-full px-5 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 group/btn active:scale-95 transition-all"
                  >
                    <span>Create Now</span>
                    <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ) : (
                <div className="text-xs font-medium text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to select
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <CommunityCodeConsentDialog
        isOpen={showConsentDialog}
        onAccept={handleConsentAccept}
        onCancel={handleConsentCancel}
      />

      <NeonRequiredDialog
        isOpen={showNeonDialog}
        onClose={() => setShowNeonDialog(false)}
        templateTitle={template.title}
      />
    </>
  );
};
