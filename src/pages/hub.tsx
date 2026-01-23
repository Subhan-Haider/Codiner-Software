import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutGrid, Users, Zap, Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useSettings } from "@/hooks/useSettings";
import { useTemplates } from "@/hooks/useTemplates";
import { TemplateCard } from "@/components/TemplateCard";
import { CreateAppDialog } from "@/components/CreateAppDialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const HubPage: React.FC = () => {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { templates, isLoading } = useTemplates();
  const { settings, updateSettings } = useSettings();
  const selectedTemplateId = settings?.selectedTemplateId;

  const handleTemplateSelect = (templateId: string) => {
    updateSettings({ selectedTemplateId: templateId });
  };

  const handleCreateApp = () => {
    setIsCreateDialogOpen(true);
  };

  // Filter and sort templates
  const filteredTemplates = templates?.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const officialTemplates = filteredTemplates.filter((template) => template.isOfficial);
  const communityTemplates = filteredTemplates.filter((template) => !template.isOfficial);

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-12">
          <Button
            onClick={() => router.history.back()}
            variant="ghost"
            className="group px-4 hover:bg-primary/10 rounded-full transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Go Back</span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="relative group/search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors h-4 w-4" />
              <input
                type="text"
                placeholder="Find a template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted/40 backdrop-blur-sm border-border hover:border-border/80 focus:border-primary focus:bg-background/90 transition-all rounded-full text-sm outline-none w-64 shadow-inner"
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full shadow-sm">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Zap size={14} className="fill-primary" /> The Template Hub
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter"
          >
            Choose Your <span className="text-primary italic">Foundation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Pick a production-ready starter or a community masterpiece. Your ideas deserve a world-class starting point.
          </motion.p>
        </div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="space-y-20 pb-24"
        >
          {/* Official Templates */}
          <AnimatePresence>
            {officialTemplates.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8 border-b border-border/10 pb-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Official Blueprints</h2>
                    <p className="text-sm text-muted-foreground italic">Battle-tested and maintained by the Codiner team</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {officialTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={template.id === selectedTemplateId}
                      onSelect={handleTemplateSelect}
                      onCreateApp={handleCreateApp}
                    />
                  ))}
                </div>
              </section>
            )}
          </AnimatePresence>

          {/* Community Templates */}
          <AnimatePresence>
            {communityTemplates.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8 border-b border-border/10 pb-4">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                    <Users size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Community Originals</h2>
                    <p className="text-sm text-muted-foreground italic">Innovation shared by developers worldwide</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {communityTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={template.id === selectedTemplateId}
                      onSelect={handleTemplateSelect}
                      onCreateApp={handleCreateApp}
                    />
                  ))}
                </div>
              </section>
            )}
          </AnimatePresence>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 bg-muted/20 border border-dashed rounded-3xl">
              <p className="text-muted-foreground">No templates found matching "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")}>Clear search</Button>
            </div>
          )}
        </motion.div>
      </div>

      <CreateAppDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        template={templates?.find((t) => t.id === settings?.selectedTemplateId)}
      />
    </div>
  );
};

export default HubPage;
