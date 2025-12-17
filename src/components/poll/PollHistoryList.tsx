import React from "react";
import { usePoll } from "@/context/PollContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PollHistoryList() {
    const { state } = usePoll();
    const polls = state.polls.slice().reverse(); // Show newest first

    if (polls.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No poll history available yet.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    View Poll History
                </h1>
            </div>

            <div className="space-y-10">
                {polls.map((poll, index) => {
                    // Calculate stats for this poll
                    const pollAnswers = state.answers.filter((a) => a.pollId === poll.id);
                    const totalVotes = pollAnswers.length;
                    const votes = new Array(poll.options.length).fill(0);
                    pollAnswers.forEach((answer) => {
                        if (votes[answer.optionIndex] !== undefined) {
                            votes[answer.optionIndex]++;
                        }
                    });

                    return (
                        <div key={poll.id} className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Question {polls.length - index}
                            </h2>

                            <div className="bg-[#5b5bd6] bg-opacity-80 text-white p-4 rounded-t-lg shadow-sm">
                                <p className="font-medium text-lg">{poll.question}</p>
                                {poll.duration && (
                                    <div className="text-xs opacity-80 mt-1">
                                        Duration: {poll.duration}s
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border rounded-b-lg p-6 shadow-sm space-y-3">
                                {poll.options.map((option, optIndex) => {
                                    const voteCount = votes[optIndex];
                                    const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                                    // Visual bar logic
                                    // We want a bar that sits behind the text.
                                    // Or we can use a native progress bar. 
                                    // The design looks like the row itself is the bar.

                                    return (
                                        <div key={optIndex} className="relative h-14 rounded-lg border border-purple-100 overflow-hidden bg-gray-50 flex items-center">
                                            {/* Progress Bar Background */}
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#5b5bd6] transition-all duration-1000 ease-out"
                                                style={{ width: `${percentage}%`, opacity: 0.15 }} // 15% opacity to make text readable? Or closer to design?
                                            // Design has solid blue but maybe text is white if 100%? 
                                            // Actually looking at "Mars 75%", the bar is solid blue. The text "Mars" is white?
                                            // "Venus 5%" bar is small. Text "Venus" is black?
                                            // This implies the text color changes based on background... tricky.
                                            // Let's stick to a simpler approach: Bar underneath, semi-transparent or light color, or use mix-blend-mode?
                                            // Wait, "Mars" text is clearly white on the blue bar. "Venus" text is black on white bg.
                                            // Implementation:
                                            // Layer 1: Background (white/grey)
                                            // Layer 2: Bar (Blue) with width %. z-index 0.
                                            // Layer 3: Text content. z-index 1. 
                                            // But for text color contrast, we usually duplicate the text or use mix-blend-mode: difference (ugly).
                                            // Simplest: Just use a light bar color or semi-transparent so black text works always.
                                            // EXCEPT design clearly shows white text on blue.

                                            // Let's try to match it: 
                                            // If percentage > x, maybe we can assume it covers the text... 
                                            // Let's us a semi-transparent blue that is dark enough to look like the design but light enough for black text?
                                            // Or just use the design color #5b5bd6 which is quite dark.

                                            // Let's go with the semi-transparent approach for now to be safe, or just a separate progress bar underneath?
                                            // No, design is "filled row".

                                            // I'll use a `z-0` div for the bar. `z-10` relative div for content.
                                            // The bar will be opacity 100 but maybe a lighter shade?
                                            // Looking at "Venus", the bar is barely there.
                                            // Looking at "Saturn 15%", bar covers "4 Satu".
                                            // Actually, let's just make the text standard black/gray. The Blue bar can be behind.
                                            />
                       
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#5b5bd6] transition-all duration-1000 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            />

                                            {/* Content */}
                                            <div className="relative z-10 w-full flex items-center justify-between px-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={cn(
                                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white",
                                                        percentage > 50 ? "text-[#5b5bd6]" : "text-gray-500"
                                                    )}>
                                                        {optIndex + 1}
                                                    </span>
                                                    <span className={cn(
                                                        "font-medium text-lg",
                                                        percentage > 40 ? "text-white" : "text-gray-900"
                                                        // Heuristic: if bar is > 40%, it likely covers the text.
                                                    )}>
                                                        {option}
                                                    </span>
                                                </div>
                                                <span className={cn(
                                                    "font-bold text-lg",
                                                    percentage > 90 ? "text-white" : "text-gray-900"
                                                )}>
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
