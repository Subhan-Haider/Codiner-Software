import { useState } from "react";
import { SendIcon, StopCircleIcon, Mic, MicOff, Sparkles, Folder, X } from "lucide-react";
import { useVoiceInput } from "@/hooks/useVoiceInput";

import { useSettings } from "@/hooks/useSettings";
import { homeChatInputValueAtom } from "@/atoms/chatAtoms"; // Use a different atom for home input
import { useAtom } from "jotai";
import { useStreamChat } from "@/hooks/useStreamChat";
import { useAttachments } from "@/hooks/useAttachments";
import { AttachmentsList } from "./AttachmentsList";
import { DragDropOverlay } from "./DragDropOverlay";
import { FileAttachmentDropdown } from "./FileAttachmentDropdown";
import { usePostHog } from "posthog-js/react";
import { HomeSubmitOptions } from "@/pages/home";
import { ChatInputControls } from "../ChatInputControls";
import { LexicalChatInput } from "./LexicalChatInput";
import { cn } from "@/lib/utils";
import { useChatModeToggle } from "@/hooks/useChatModeToggle";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";
import { IpcClient } from "@/ipc/ipc_client";
import { toast } from "sonner";
export function HomeChatInput({
  onSubmit,
}: {
  onSubmit: (options?: HomeSubmitOptions) => void;
}) {
  const posthog = usePostHog();
  const [inputValue, setInputValue] = useAtom(homeChatInputValueAtom);
  const { settings } = useSettings();
  const { isStreaming } = useStreamChat({
    hasChatId: false,
  }); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [projectLocation, setProjectLocation] = useState<string | null>(null);
  useChatModeToggle();

  const handleSelectLocation = async () => {
    try {
      const response = await IpcClient.getInstance().selectAppLocation();
      if (!response.canceled && response.path) {
        setProjectLocation(response.path);
        posthog.capture("chat:location_selected");
      }
    } catch (error) {
      console.error("Failed to select location:", error);
    }
  };


  const typingText = useTypingPlaceholder([
    "an ecommerce store...",
    "an information page...",
    "a landing page...",
  ]);
  const placeholder = `Ask Codiner to build ${typingText ?? ""}`;

  // Use the attachments hook
  const {
    attachments,
    isDraggingOver,
    handleFileSelect,
    removeAttachment,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearAttachments,
    handlePaste,
  } = useAttachments();

  // Custom submit function that wraps the provided onSubmit
  const handleCustomSubmit = () => {
    if ((!inputValue.trim() && attachments.length === 0) || isStreaming) {
      return;
    }

    // Call the parent's onSubmit handler with attachments
    onSubmit({ attachments, parentDirectory: projectLocation || undefined });

    // Clear attachments as part of submission process
    clearAttachments();
    posthog.capture("chat:home_submit");
  };

  const { isListening, toggleListening } = useVoiceInput();

  if (!settings) {
    return null; // Or loading state
  }

  const handleVoiceResult = (text: string) => {
    setInputValue((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleEnhance = async () => {
    if (!inputValue.trim() || isEnhancing) return;

    try {
      setIsEnhancing(true);
      const enhanced = await IpcClient.getInstance().enhancePrompt(inputValue);
      setInputValue(enhanced);
      toast.success("Prompt enhanced with AI ✨");
      posthog.capture("chat:prompt_enhanced");
    } catch (error: any) {
      console.error("Failed to enhance prompt:", error);
      toast.error(error.message || "Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <>
      <div className="w-full" data-testid="home-chat-input-container">
        <div
          className={`relative flex flex-col space-y-2 border border-border/40 glass shadow-xl p-2 rounded-2xl transition-all duration-300 ${isDraggingOver ? "ring-2 ring-primary border-primary shadow-primary/20" : ""
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Attachments list */}
          <AttachmentsList
            attachments={attachments}
            onRemove={removeAttachment}
          />

          {/* Drag and drop overlay */}
          <DragDropOverlay isDraggingOver={isDraggingOver} />

          <div className="flex items-start space-x-2 ">
            <LexicalChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleCustomSubmit}
              onPaste={handlePaste}
              placeholder={placeholder}
              disabled={isStreaming}
              excludeCurrentApp={false}
              disableSendButton={false}
            />

            <button
              onClick={handleEnhance}
              disabled={isStreaming || isEnhancing || !inputValue.trim()}
              className={cn(
                "px-3 py-2 mt-1 mr-1 rounded-xl transition-all",
                isEnhancing
                  ? "bg-primary text-primary-foreground animate-pulse"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
              title="Enhance prompt with AI"
            >
              <Sparkles size={20} className={isEnhancing ? "animate-spin-slow" : ""} />
            </button>

            <button
              onClick={handleSelectLocation}
              disabled={isStreaming}
              className={cn(
                "px-3 py-2 mt-1 mr-1 rounded-xl transition-all",
                projectLocation
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
              title={projectLocation ? `Project location: ${projectLocation}` : "Select project location"}
            >
              <Folder size={20} />
            </button>


            <button
              onClick={() => toggleListening(handleVoiceResult)}
              disabled={isStreaming}
              className={`px-3 py-2 mt-1 mr-1 rounded-xl transition-all ${isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              title={isListening ? "Stop listening" : "Voice input"}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* File attachment dropdown */}
            <FileAttachmentDropdown
              className="mt-1 mr-1"
              onFileSelect={handleFileSelect}
              disabled={isStreaming}
            />

            {isStreaming ? (
              <button
                className="px-3 py-2 mt-1 mr-2 bg-muted text-muted-foreground rounded-xl opacity-50 cursor-not-allowed transition-all"
                title="Cancel generation (unavailable here)"
              >
                <StopCircleIcon size={20} />
              </button>
            ) : (
              <button
                onClick={handleCustomSubmit}
                disabled={!inputValue.trim() && attachments.length === 0}
                className="px-3 py-2 mt-1 mr-2 bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all rounded-xl disabled:opacity-50 disabled:grayscale disabled:scale-100"
                title="Send message"
              >
                <SendIcon size={20} />
              </button>
            )}
          </div>
          <div className="px-2 pb-2 flex items-center justify-between">
            <ChatInputControls />
            {projectLocation && (
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full border border-primary/10 animate-in fade-in slide-in-from-right-2">
                <Folder size={12} className="text-primary" />
                <span className="text-[10px] font-medium text-primary truncate max-w-[200px]" title={projectLocation}>
                  {projectLocation}
                </span>
                <button
                  onClick={() => setProjectLocation(null)}
                  className="hover:text-destructive transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
