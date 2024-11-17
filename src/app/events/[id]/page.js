"use client";
import React, { useState, useEffect } from "react";
import { events } from "@/data/events";
import Navbar from "@/components/Navbar";
import SeatSelector from "@/components/SeatSelector";
import QueueSystem from "@/components/QueueSystem";
import Ticket from "@/components/Ticket";

export default function EventPage({ params }) {
  const [showQueue, setShowQueue] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTicket, setShowTicket] = useState(false);
  const [userName, setUserName] = useState("");
  const [event, setEvent] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function unwrapParamsAndFetchEvent() {
      try {
        const resolvedParams = await params; // Unwrap params
        const eventId = resolvedParams?.id;

        if (eventId) {
          const foundEvent = events.find((e) => e.id === eventId);
          if (foundEvent) {
            setEvent(foundEvent);
          } else {
            console.error(`Event with ID ${eventId} not found.`);
          }
        }
      } catch (err) {
        console.error("Error unwrapping params or fetching event:", err);
      }
    }

    unwrapParamsAndFetchEvent();
  }, [params]);

  const handleQueueComplete = () => {
    setShowQueue(false);
  };

  const handleSeatSelect = (selectedSeatsData) => {
    setSelectedSeats(selectedSeatsData);
    const total = selectedSeatsData.reduce((sum, seat) => sum + seat.price, 0);
    setTotalPrice(total);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedSeats.length > 0 && userName) {
      setShowTicket(true);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  if (showTicket) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4">
          <Ticket
            eventDetails={event}
            userDetails={{
              name: userName,
              seats: selectedSeats,
              totalPrice: totalPrice,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {showQueue ? (
        <QueueSystem onComplete={handleQueueComplete} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">{event.title}</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p className="font-bold">
                  {event.date} at {event.time}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Venue</p>
                <p className="font-bold">{event.venue}</p>
              </div>
              <div>
                <p className="text-gray-600">Base Price</p>
                <p className="font-bold">₹{event.price}</p>
              </div>
            </div>
          </div>

          <SeatSelector
            availableSeats={event.availableSeats}
            onSeatSelect={handleSeatSelect}
          />

          {selectedSeats.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-2">Selected Seats Summary:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSeats.map(({ seatNumber, price }) => (
                  <div key={seatNumber} className="bg-gray-100 px-3 py-1 rounded">
                    {seatNumber} (₹{price})
                  </div>
                ))}
              </div>
              <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
            </div>
          )}

          <form onSubmit={handleBooking} className="mt-8">
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={selectedSeats.length === 0}
            >
              Complete Booking (₹{totalPrice})
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
