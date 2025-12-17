import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePoll } from "@/context/PollContext";
import { MessageCircle, X, Send, User, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatPopupProps {
  userType: "teacher" | "student";
  userName: string;
}

export function ChatPopup({ userType, userName }: ChatPopupProps) {
  const { state, sendChatMessage } = usePoll();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastSeenMessageCount = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  useEffect(() => {
    const chatMessages = state.chatMessages || [];
    if (!isOpen && chatMessages.length > lastSeenMessageCount.current) {
      setUnreadCount(chatMessages.length - lastSeenMessageCount.current);
    }
  }, [state.chatMessages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const chatMessages = state.chatMessages || [];
      lastSeenMessageCount.current = chatMessages.length;
      setUnreadCount(0);
    }
  }, [isOpen, state.chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendChatMessage(message.trim(), userType, userName);
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const activeStudents = state.students.filter(s => !s.isKicked);

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="relative w-14 h-14 rounded-full shadow-lg bg-[#5767D0]"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 shadow-2xl bg-white rounded-lg overflow-hidden">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <div className="flex items-center justify-between border-b px-2 pt-2 bg-white sticky top-0 z-10">
              <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#7765DA] data-[state=active]:text-foreground rounded-none px-4 py-2 text-gray-500 shadow-none"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="participants"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#7765DA] data-[state=active]:text-foreground rounded-none px-4 py-2 text-gray-500 shadow-none"
                >
                  Participants
                </TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 -mt-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 overflow-hidden data-[state=inactive]:hidden data-[state=active]:flex">
              <Card className="flex-1 flex flex-col border-0 shadow-none rounded-none">
                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {!state.chatMessages || state.chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 text-sm mt-8">
                        No messages yet. Start a conversation!
                      </div>
                    ) : (
                      state.chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderType === userType
                            ? "justify-end"
                            : "justify-start"
                            } `}
                        >
                          <div
                            className={`max-w-[75%] rounded-lg p-3 ${msg.senderType === userType
                              ? "bg-[#7765DA] text-white"
                              : "bg-[#373737] text-white"
                              } `}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              {msg.senderType === "teacher" ? (
                                <GraduationCap className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                              <span className="text-xs opacity-75">
                                {msg.senderName}
                              </span>
                            </div>
                            <p className="text-sm">{msg.message}</p>
                            <div className="text-xs opacity-75 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                        maxLength={500}
                      />
                      <Button type="submit" size="icon" className="bg-[#4F0DCE]" disabled={!message.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants" className="flex-1 flex flex-col p-0 m-0 overflow-hidden data-[state=inactive]:hidden data-[state=active]:flex">
              <Card className="flex-1 flex flex-col border-0 shadow-none rounded-none">
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <h3 className="text-sm font-semi-bold text-black mb-4">Name</h3>
                  <div className="space-y-4">
                    {activeStudents.length === 0 ? (
                      <p className="text-sm text-gray-500">No participants yet.</p>
                    ) : (
                      activeStudents.map((student) => (
                        <div key={student.id} className="flex items-center gap-2">
                          <span className="text-sm font-bold">{student.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}

