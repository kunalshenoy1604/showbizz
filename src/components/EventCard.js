import React from 'react';
import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <img
          src={event?.image || "/placeholder-image.jpg"} // Fallback for missing image
          alt={event?.title || "Event image"} // Fallback for missing title
          className="w-full h-[280px] object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{event?.title || "Untitled Event"}</h3>
          {event?.tags?.length > 0 && (
            <p className="text-sm text-gray-200">{event.tags.join(' | ')}</p>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">{event?.date || "TBA"}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{event?.venue || "Venue not available"}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">₹{event?.price ?? "N/A"}</span>
            <Link
              href={`/events/${event?.id}`}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              aria-label={`Book tickets for ${event?.title || "this event"}`}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
