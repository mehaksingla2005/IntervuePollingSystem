import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col items-center">

        {/* Badge */}
        <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium mb-8">
          <Sparkles className="h-4 w-4" />
          <span>Intervue Poll</span>
        </div>

        {/* Headings */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome to the <span className="font-extrabold">Live Polling System</span>
          </h1>
          <p className="text-lg">
            Please select the role that best describes you to begin using the live polling system
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
          {/* Student Card */}
          <Card
            className={cn(
              "cursor-pointer transition-all duration-200 border-2 hover:border-primary/50",
              selectedRole === "student" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
            )}
            onClick={() => setSelectedRole("student")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">I'm a Student</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Join polls, submit your answers, and see how others responded real-time.
              </p>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card
            className={cn(
              "cursor-pointer transition-all duration-200 border-2 hover:border-primary/50",
              selectedRole === "teacher" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
            )}
            onClick={() => setSelectedRole("teacher")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">I'm a Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">
                Create polls, manage questions, and view live results from your students.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <Button
          size="lg"
          className="w-full max-w-xs text-lg h-12 rounded-full"
          onClick={handleContinue}
          disabled={!selectedRole}
        >
          Continue
        </Button>

      </div>
    </div>
  );
}