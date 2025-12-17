import React, { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PollQuestion } from "@/components/poll/PollQuestion";
import { PollResults } from "@/components/poll/PollResults";
import { ChatPopup } from "@/components/poll/ChatPopup";
import { usePoll } from "@/context/PollContext";
import { ArrowLeft, User, Clock, AlertTriangle, Sparkles, Loader2 } from "lucide-react";

export default function StudentInterface() {
  const { state, registerStudent, refreshState } = usePoll();
  const [studentId, setStudentId] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [nameInput, setNameInput] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isKicked, setIsKicked] = useState(false);

  const currentPoll = state.currentPoll;
  const hasActivePoll = currentPoll && currentPoll.isActive;

  useEffect(() => {
    socket.emit("join", { role: "student" });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Auto-refresh state every 2 seconds to sync with teacher actions
  useEffect(() => {
    const interval = setInterval(() => {
      refreshState();
    }, 2000);

    return () => clearInterval(interval);
  }, [refreshState]);

  useEffect(() => {
    // Check if student is already registered in this tab
    const savedStudentId = sessionStorage.getItem("studentId");
    const savedStudentName = sessionStorage.getItem("studentName");

    if (savedStudentId && savedStudentName) {
      setStudentId(savedStudentId);
      setStudentName(savedStudentName);
    } else {
      setShowNameModal(true);
    }
  }, []);

  useEffect(() => {
    // Check if student has already answered the current poll
    if (studentId && currentPoll) {
      const hasAnswered = state.answers.some(
        (answer) =>
          answer.pollId === currentPoll.id && answer.studentId === studentId,
      );
      setShowResults(hasAnswered || !currentPoll.isActive);
    } else if (!hasActivePoll) {
      setShowResults(true);
    }
  }, [studentId, currentPoll, state.answers, hasActivePoll]);

  // Check if student has been kicked
  useEffect(() => {
    if (studentId) {
      const student = state.students.find((s) => s.id === studentId);
      if (student && student.isKicked) {
        setIsKicked(true);
      }
    }
  }, [studentId, state.students]);

  const handleNameSubmit = (name: string) => {
    const id = registerStudent(name);
    setStudentId(id);
    setStudentName(name);
    setShowNameModal(false);
  };

  const handleAnswerSubmitted = () => {
    setShowResults(true);
  };

  if (showNameModal) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in duration-500">
          <div className="flex justify-center">
            <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Intervue Poll</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Let's Get Started
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              If you're a student, you'll be able to{" "}
              <strong className="text-gray-900">submit your answers</strong>,
              participate in live polls, and see how your responses compare with
              your classmates
            </p>
          </div>

          <div className="max-w-md mx-auto w-full space-y-8 mt-12">
            <div className="space-y-3">
              <Label htmlFor="studentName" className="text-base font-bold">
                Enter your Name
              </Label>
              <Input
                id="studentName"
                placeholder="e.g. Rahul Bajaj"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="h-14 bg-gray-50 border-none text-lg px-4"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && nameInput.trim()) {
                    handleNameSubmit(nameInput.trim());
                  }
                }}
              />
            </div>
            <Button
              className="w-full text-lg h-14 text-lg font-medium rounded-full"
              onClick={() => {
                if (nameInput.trim()) {
                  handleNameSubmit(nameInput.trim());
                }
              }}
              disabled={!nameInput.trim()}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isKicked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-red-700 mb-4">
              You have been removed from this polling session by the teacher.
            </p>
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasActivePoll) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
        <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
          <Badge
            variant="default"
            className="bg-[#6B46C1] hover:bg-[#6B46C1] text-white px-4 py-1.5 rounded-full text-sm font-medium gap-2 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Intervue Poll
          </Badge>

          <div className="relative">
            <Loader2 className="h-12 w-12 text-[#6B46C1] animate-spin" />
          </div>

          <h2 className="text-2xl font-bold text-[#111827] text-center max-w-md">
            Wait for the teacher to ask questions..
          </h2>
        </div>

        {/* Chat Popup */}
        <ChatPopup userType="student" userName={studentName} />
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold">Student Interface</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{studentName}</span>
              </div>
              {hasActivePoll && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Poll Active
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {hasActivePoll && !showResults ? (
          <div className="space-y-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-900">
                  New Poll Available!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">
                  A new poll has been created. Please submit your answer within
                  the time limit.
                </p>
              </CardContent>
            </Card>

            <PollQuestion
              studentId={studentId}
              studentName={studentName}
              questionNumber={state.polls.length}
              onAnswerSubmitted={handleAnswerSubmitted}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {state.results && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Poll Results
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Thank you for your response! Here are the live results.
                  </p>
                </div>
                <PollResults />
              </div>
            )}
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-sm">Your Session Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Name:</strong> {studentName}
              </p>
              <p>
                <strong>Student ID:</strong> {studentId}
              </p>
              <p>
                <strong>Tab Session:</strong> Your name is saved only for this
                browser tab
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Popup */}
        <ChatPopup userType="student" userName={studentName} />
      </div>
    </div>
  );
}
