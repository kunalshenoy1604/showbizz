"use client";
import { useState, useEffect } from "react";

export default function QueueSystem({ onComplete }) {
  const [queuePosition, setQueuePosition] = useState(null); // Hydration-safe initial state
  const [timeLeft, setTimeLeft] = useState(null); // Hydration-safe initial state

  const INITIAL_QUEUE_POSITION = 30; // Example: 30 people in line
  const TIME_PER_PERSON = 5; // 5 seconds per person

  useEffect(() => {
    // Initialize queue position and time left
    setQueuePosition(INITIAL_QUEUE_POSITION);
    setTimeLeft(INITIAL_QUEUE_POSITION * TIME_PER_PERSON);

    const interval = setInterval(() => {
      setQueuePosition((prev) => {
        if (prev > 1) {
          return prev - 1; // Decrement position
        } else {
          clearInterval(interval); // Stop interval at position 1
          onComplete(); // Trigger callback
          return prev;
        }
      });

      setTimeLeft((prev) => Math.max(0, prev - TIME_PER_PERSON)); // Decrease time left
    }, TIME_PER_PERSON * 1000); // Adjust interval to match TIME_PER_PERSON

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [onComplete]);

  if (queuePosition === null || timeLeft === null) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-10 blur-lg" />
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Please wait in line
        </h2>
        <div className="space-y-6">
          {/* Queue Position */}
          <div className="text-gray-600">
            <p className="text-lg">
              Position in queue:
              <span className="text-gray-900 font-bold ml-2">
                {queuePosition}
              </span>
            </p>
            <p className="text-lg">
              Estimated time:
              <span className="text-gray-900 font-bold ml-2">
                {Math.ceil(timeLeft / 60)} min {timeLeft % 60} sec
              </span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${((INITIAL_QUEUE_POSITION - queuePosition) / INITIAL_QUEUE_POSITION) * 100}%` }}
            />
          </div>

          {/* Warning Message */}
          <p className="text-sm text-gray-500">
            Do not refresh the page, or you may lose your position in line.
          </p>
        </div>

        {/* Loading Animation */}
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 animate-pulse shadow-lg" />
      </div>
    </div>
  );
}
