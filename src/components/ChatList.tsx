import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { formatDistanceToNow } from "date-fns";
import { Edit3, MessageSquare, MoreVertical, Plus, Search, Trash2 } from "lucide-react";
import { useAtom } from "jotai";
import { selectedChatIdAtom } from "@/atoms/chatAtoms";
import { selectedAppIdAtom } from "@/atoms/appAtoms";
import { dropdownOpenAtom } from "@/atoms/uiAtoms";
import { IpcClient } from "@/ipc/ipc_client";
import { showError, showSuccess } from "@/lib/toast";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChats } from "@/hooks/useChats";
import { RenameChatDialog } from "@/components/chat/RenameChatDialog";
import { DeleteChatDialog } from "@/components/chat/DeleteChatDialog";

import { ChatSearchDialog } from "./ChatSearchDialog";
import { useSelectChat } from "@/hooks/useSelectChat";
import { cn } from "@/lib/utils";

export function ChatList({ show }: { show?: boolean }) {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useAtom(selectedChatIdAtom);
  const [selectedAppId] = useAtom(selectedAppIdAtom);
  const [, setIsDropdownOpen] = useAtom(dropdownOpenAtom);

  const { chats, loading, invalidateChats } = useChats(selectedAppId);
  const routerState = useRouterState();
  const isChatRoute = routerState.location.pathname === "/chat";

  // Rename dialog state
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [renameChatId, setRenameChatId] = useState<number | null>(null);
  const [renameChatTitle, setRenameChatTitle] = useState("");

  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState<number | null>(null);
  const [deleteChatTitle, setDeleteChatTitle] = useState("");

  // search dialog state
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const { selectChat } = useSelectChat();

  // Update selectedChatId when route changes
  useEffect(() => {
    if (isChatRoute) {
      const id = routerState.location.search.id;
      if (id) {
        console.log("Setting selected chat id to", id);
        setSelectedChatId(id);
      }
    }
  }, [isChatRoute, routerState.location.search, setSelectedChatId]);


  if (!show) {
    return;
  }

  const handleChatClick = ({
    chatId,
    appId,
  }: {
    chatId: number;
    appId: number;
  }) => {
    selectChat({ chatId, appId });
    setIsSearchDialogOpen(false);
  };

  const handleNewChat = async () => {
    // Only create a new chat if an app is selected
    if (selectedAppId) {
      try {
        // Create a new chat with an empty title for now
        const chatId = await IpcClient.getInstance().createChat(selectedAppId);

        // Navigate to the new chat
        setSelectedChatId(chatId);
        navigate({
          to: "/chat",
          search: { id: chatId },
        });

        // Refresh the chat list
        await invalidateChats();
      } catch (error) {
        // DO A TOAST
        showError(`Failed to create new chat: ${(error as any).toString()} `);
      }
    } else {
      // If no app is selected, navigate to home page
      navigate({ to: "/" });
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    try {
      await IpcClient.getInstance().deleteChat(chatId);
      showSuccess("Chat deleted successfully");

      // If the deleted chat was selected, navigate to home
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
        navigate({ to: "/chat" });
      }

      // Refresh the chat list
      await invalidateChats();
    } catch (error) {
      showError(`Failed to delete chat: ${(error as any).toString()} `);
    }
  };

  const handleDeleteChatClick = (chatId: number, chatTitle: string) => {
    setDeleteChatId(chatId);
    setDeleteChatTitle(chatTitle);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteChatId !== null) {
      await handleDeleteChat(deleteChatId);
      setIsDeleteDialogOpen(false);
      setDeleteChatId(null);
      setDeleteChatTitle("");
    }
  };

  const handleRenameChat = (chatId: number, currentTitle: string) => {
    setRenameChatId(chatId);
    setRenameChatTitle(currentTitle);
    setIsRenameDialogOpen(true);
  };

  const handleRenameDialogClose = (open: boolean) => {
    setIsRenameDialogOpen(open);
    if (!open) {
      setRenameChatId(null);
      setRenameChatTitle("");
    }
  };



  return (
    <>
      <SidebarGroup
        className="h-[calc(100vh-112px)] overflow-hidden flex flex-col pt-0 pb-2"
        data-testid="chat-list-container"
      >
        <SidebarGroupContent className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between px-4 py-1 mb-0 shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="text-xs font-bold text-foreground tracking-wider truncate whitespace-nowrap">CHATS</div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchDialogOpen(true)}
                data-testid="search-chats-button"
                title="Search Chats"
              >
                <Search size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleNewChat}
                data-testid="new-chat-button"
                title="New Chat"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground/50 gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <span className="text-xs">Loading chats...</span>
              </div>
            ) : chats.length === 0 ? (
              <div className="py-8 px-4 text-sm text-muted-foreground text-center">
                No chats found
              </div>
            ) : (
              <SidebarMenu className="space-y-0.5">
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.id} className="mb-0.5 group/item">
                    <div className={cn(
                      "flex w-full items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative select-none",
                      selectedChatId === chat.id
                        ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                    )}
                      onClick={() => handleChatClick({ chatId: chat.id, appId: chat.appId })}
                    >
                      {/* Chat Icon/Status Indicator? Optional, maybe just text for chats to keep it dense */}

                      <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                        <span className="text-sm font-semibold break-words leading-tight text-foreground">
                          {chat.title || "New Session"}
                        </span>
                        <span className="text-xs text-muted-foreground/70 font-medium">
                          {formatDistanceToNow(new Date(chat.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      {/* Options Menu - Visible on hover or selected */}
                      <div className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-200",
                        selectedChatId === chat.id ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                      )}>
                        <DropdownMenu
                          modal={false}
                          onOpenChange={(open) => setIsDropdownOpen(open)}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="p-1">
                            <DropdownMenuItem
                              onClick={() => handleRenameChat(chat.id, chat.title || "")}
                            >
                              <Edit3 className="mr-2 h-3.5 w-3.5" />
                              <span>Rename</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteChatClick(chat.id, chat.title || "New Chat")}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Rename Chat Dialog */}
      {renameChatId !== null && (
        <RenameChatDialog
          chatId={renameChatId}
          currentTitle={renameChatTitle}
          isOpen={isRenameDialogOpen}
          onOpenChange={handleRenameDialogClose}
          onRename={invalidateChats}
        />
      )}

      {/* Delete Chat Dialog */}
      <DeleteChatDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
        chatTitle={deleteChatTitle}
      />

      {/* Chat Search Dialog */}
      <ChatSearchDialog
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
        onSelectChat={handleChatClick}
        appId={selectedAppId}
        allChats={chats}
      />
    </>
  );
}
