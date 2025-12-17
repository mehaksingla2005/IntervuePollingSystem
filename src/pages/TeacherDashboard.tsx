import React, { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PollCreator } from "@/components/poll/PollCreator";
import { PollResults } from "@/components/poll/PollResults";
import { PollHistoryList } from "@/components/poll/PollHistoryList";
import { Timer } from "@/components/poll/Timer";
import { ChatPopup } from "@/components/poll/ChatPopup";
import { usePoll } from "@/context/PollContext";
import {
  ArrowLeft,
  Users,
  BarChart3,
  Clock,
  UserX,
  History,
  Eye
} from "lucide-react";

export default function TeacherDashboard() {
  const { state, kickStudent, refreshState } = usePoll();
  const [activeTab, setActiveTab] = useState("create");

  const currentPoll = state.currentPoll;
  const hasActivePoll = currentPoll && currentPoll.isActive;
  const activeStudents = state.students.filter((s) => !s.isKicked);
  useEffect(() => {
    socket.emit("join", { role: "teacher" });

    return () => {
      socket.disconnect();
    };
  }, []);
  // Auto-refresh state every 3 seconds to see new students and responses
  useEffect(() => {
    const interval = setInterval(() => {
      refreshState();
    }, 3000);

    return () => clearInterval(interval);
  }, [refreshState]);

  const handleKickStudent = (studentId: string) => {
    kickStudent(studentId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {activeStudents.length} Students Online
                </span>
              </div>
              {hasActivePoll && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Poll Active
                </Badge>
              )}
              <Button
                className="bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-full ml-4 font-medium"
                onClick={() => setActiveTab("history")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Poll history
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {hasActivePoll && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">
                Current Active Poll
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">
                    {currentPoll.question}
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    {currentPoll.options.length} options •{" "}
                    {
                      state.answers.filter((a) => a.pollId === currentPoll.id)
                        .length
                    }{" "}
                    responses
                  </p>
                </div>
                <div className="text-right">
                  <Timer />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Create Poll
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Live Results
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <PollCreator />
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-8 flex flex-col items-center">
              <PollResults />
              <Button
                className="w-full max-w-sm mx-auto bg-[#5b5bd6] hover:bg-[#4a4ac2] text-white rounded-full py-6 text-lg"
                onClick={() => setActiveTab("create")}
              >
                + Ask a new question
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <PollHistoryList />
          </TabsContent>
        </Tabs>

        {activeStudents.length > 0 && activeTab !== "results" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeStudents.map((student) => {
                  const hasAnsweredCurrent =
                    currentPoll &&
                    state.answers.some(
                      (a) =>
                        a.pollId === currentPoll.id &&
                        a.studentId === student.id,
                    );

                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-xs text-gray-500">
                          Joined:{" "}
                          {new Date(student.joinedAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasActivePoll && (
                          <Badge
                            variant={
                              hasAnsweredCurrent ? "default" : "secondary"
                            }
                          >
                            {hasAnsweredCurrent ? "Answered" : "Waiting"}
                          </Badge>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Kick Student</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {student.name}{" "}
                                from this polling session? They will no longer
                                be able to participate.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleKickStudent(student.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Kick Student
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Popup */}
        <ChatPopup userType="teacher" userName="Teacher" />
      </div>
    </div>
  );
}
