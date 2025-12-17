import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { usePoll } from "@/context/PollContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function PollCreator() {
  const { createPoll, canCreateNewPoll } = usePoll();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("60");
  const [correctOption, setCorrectOption] = useState<number | null>(null);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctOption === index) setCorrectOption(null);
      if (correctOption !== null && correctOption > index) {
        setCorrectOption(correctOption - 1);
      }
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options");
      return;
    }

    // Pass the correctOption index if it points to a valid non-empty option
    // We need to map the original index to the filtered index if we were filtering...
    // But for simplicity, let's just error if blank options are present or clean them up.
    // Actually, createPoll expects string[].

    // Simplification: We send all options as is, assuming user filled them.
    // Or we filter and adjust index.

    // Let's just strip empty ones from the end?
    // For now, I'll pass all options but alert if any are empty
    if (options.some(opt => !opt.trim())) {
      alert("Please fill in all options or remove empty ones.");
      return;
    }

    createPoll(question.trim(), options, parseInt(duration), correctOption !== null ? correctOption : undefined);
    setQuestion("");
    setOptions(["", ""]);
    setCorrectOption(null);
  };

  if (!canCreateNewPoll()) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
        <CardContent className="pt-6">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">
              Active Poll in Progress
            </h3>
            <p className="text-gray-500 mt-2">
              Please wait for the current poll to end before creating a new one.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
          ✨ Intervue Poll
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Let's Get Started
        </h1>
        <p className="text-gray-500 max-w-2xl">
          you'll have the ability to create and manage polls, ask questions, and
          monitor your students' responses in real-time.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold text-gray-900">
              Enter your question
            </Label>
            <div className="w-32">
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-gray-100 border-none">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                  <SelectItem value="90">90 seconds</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="resize-none h-32 bg-gray-50 border-gray-200 text-base p-4"
              maxLength={100}
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {question.length}/100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
          <div>
            <Label className="text-base font-semibold text-gray-900 mb-4 block">
              Edit Options
            </Label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 relative group">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="bg-gray-50 border-gray-100 h-12 pl-4"
                      placeholder={`Option ${index + 1}`}
                    />
                    {/* Only show delete if > 2 options */}
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="sr-only">Delete</span>
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={addOption}
              className="mt-4 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
            >
              + Add More option
            </Button>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-900 mb-4 block">
              Is it Correct?
            </Label>
            <div className="space-y-3">
              {options.map((_, index) => (
                <div key={index} className="h-12 flex items-center">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                          correctOption === index ? "border-purple-600" : "border-gray-300"
                        )}
                        onClick={() => setCorrectOption(index)}
                      >
                        {correctOption === index && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                          correctOption !== index ? "border-purple-600" : "border-gray-300"
                        )}
                        onClick={() => correctOption === index && setCorrectOption(null)}
                      >
                        {correctOption !== index && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-[#5b5bd6] hover:bg-[#4a4ab8] text-white px-8 py-6 rounded-full text-base font-medium"
            >
              Ask Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
