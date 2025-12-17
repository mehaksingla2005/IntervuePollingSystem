import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePoll } from "@/context/PollContext";
import { Clock } from "lucide-react";

interface PollQuestionProps {
  studentId: string;
  studentName: string;
  questionNumber: number;
  onAnswerSubmitted: () => void;
}

export function PollQuestion({
  studentId,
  studentName,
  questionNumber,
  onAnswerSubmitted,
}: PollQuestionProps) {
  const { state, submitAnswer, getTimeRemaining } = usePoll();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  const currentPoll = state.currentPoll;

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (remaining === 0 && !isSubmitted) {
        // Auto-submit or just mark as submitted/timeout handled by parent check usually, 
        // but here we just ensure UI reflects it.
        // We can optionally auto-submit empty if time runs out, 
        // but strict requirement might just be to close it.
        // For now, let's trigger the timeout callback logic if needed.
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeRemaining, isSubmitted]);

  useEffect(() => {
    // Only check if student has already answered this specific poll
    if (currentPoll && studentId) {
      const existingAnswer = state.answers.find(
        (answer) =>
          answer.pollId === currentPoll.id && answer.studentId === studentId,
      );
      setIsSubmitted(!!existingAnswer);
    }
  }, [currentPoll?.id, state.answers, studentId]);

  useEffect(() => {
    // Reset selection only when poll ID changes (new poll)
    setSelectedOption("");
    setIsSubmitted(false);
  }, [currentPoll?.id]);

  if (!currentPoll || !currentPoll.isActive) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-none shadow-none bg-transparent">
        <CardContent className="text-center py-8">
          <p className="text-gray-600">
            No active poll at the moment. Please wait for the teacher to create
            a new poll.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-none shadow-none bg-transparent">
        <CardContent className="text-center py-8">
          <p className="text-green-600 text-lg font-medium">
            Thank you for your response!
          </p>
          <p className="text-gray-600 mt-2">
            You have already answered this poll. You can view the results below.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      const optionIndex = parseInt(selectedOption);
      submitAnswer(studentId, studentName, optionIndex);
      setIsSubmitted(true);
      onAnswerSubmitted();
    }
  };

  const handleTimeout = () => {
    setIsSubmitted(true);
    onAnswerSubmitted();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Header Row: Question Number and Timer */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Question {questionNumber}</h2>
        <div className="flex items-center gap-1.5 text-red-500 font-bold text-lg bg-red-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-[#5b5bd6] px-6 py-6 border-b border-white/10 text-white">
          <h3 className="text-xl font-medium leading-relaxed">
            {currentPoll.question}
          </h3>
        </div>

        <CardContent className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-3">
              {currentPoll.options.map((option, index) => {
                const isSelected = selectedOption === index.toString();
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedOption(index.toString())}
                    className={`
                        relative flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                        ${isSelected
                        ? "border-[#5b5bd6] bg-[#5b5bd6]/5 ring-1 ring-[#5b5bd6]/20"
                        : "border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200"
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className="sr-only" // Hide default radio
                    />

                    {/* Custom Circle Number */}
                    <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold transition-colors
                        ${isSelected
                        ? "bg-[#5b5bd6] text-white"
                        : "bg-gray-400 text-white"
                      }
                    `}>
                      {index + 1}
                    </div>

                    <Label
                      htmlFor={`option-${index}`}
                      className="text-lg cursor-pointer flex-1 font-medium text-gray-700 select-none pointer-events-none"
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="w-40 bg-[#5b5bd6] hover:bg-[#4a4ac2] text-white rounded-full h-12 text-lg font-medium shadow-md transition-transform active:scale-95"
                disabled={!selectedOption}
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
