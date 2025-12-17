import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { usePoll } from "@/context/PollContext";

export function PollResults() {
  const { state } = usePoll();
  const results = state.results;

  if (
    !results ||
    !results.options ||
    !results.votes ||
    results.totalVotes === 0
  ) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-none shadow-sm bg-white">
        <CardContent className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Waiting for responses...
          </p>
        </CardContent>
      </Card>
    );
  }

  const maxVotes = Math.max(...results.votes);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Question</h2>

      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-[#555555] px-6 py-6 border-b border-white/10 text-white">
          <h3 className="text-xl font-medium leading-relaxed">
            {results.question}
          </h3>
        </div>

        <CardContent className="p-6 bg-white space-y-4">
          {results.options.map((option, index) => {
            const votes = results.votes[index];
            const percentage = results.totalVotes
              ? Math.round((votes / results.totalVotes) * 100)
              : 0;

            const isWinning = votes === maxVotes && votes > 0;

            return (
              <div key={index} className="relative w-full">
                <div className="flex items-center w-full h-14 rounded-lg overflow-hidden bg-gray-50 border border-purple-100 relative">
                  {/* Progress Bar Background */}
                  <div
                    className="absolute top-0 left-0 h-full bg-[#5b5bd6] transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />

                  {/* Content Layer */}
                  <div className="relative z-10 w-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      {/* Circle Number */}
                      <div className={`
                                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                    ${percentage > 0 ? "bg-white text-[#5b5bd6]" : "bg-[#5b5bd6] text-white"}
                                `}>
                        {index + 1}
                      </div>
                      <span className={`font-medium ${percentage > 50 ? "text-white" : "text-gray-900"}`}>
                        {option}
                      </span>
                    </div>
                    <span className={`font-bold ${percentage > 90 ? "text-white" : "text-gray-900"}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
