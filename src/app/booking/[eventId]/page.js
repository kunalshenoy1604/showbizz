"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { events } from "@/data/events";
import Navbar from "@/components/Navbar";
import SeatSelector from "@/components/SeatSelector";
import Ticket from "@/components/Ticket";

export default function BookingPage({ params = {} }) {
  const router = useRouter();
  const [step, setStep] = useState("select-seats"); // ['select-seats', 'payment', 'confirmation']
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Ensure `params.eventId` is accessed safely
    const eventId = params?.eventId;
    const foundEvent = events.find((e) => e.id === eventId);

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      console.error("Event not found");
    }
  }, [params]);

  if (!event) {
    return <div>Loading event details...</div>;
  }

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePayment = () => {
    // In a real app, handle payment processing here
    setStep("confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === "select-seats" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
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
              </div>
            </div>

            <SeatSelector
              availableSeats={event.availableSeats}
              onSeatSelect={handleSeatSelect}
            />

            <form
              onSubmit={handleUserDetailsSubmit}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!selectedSeat}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {step === "payment" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-bold">Order Summary</p>
                <p>Event: {event.title}</p>
                <p>Seat: {selectedSeat}</p>
                <p>Total: ₹{event.price}</p>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">Thank you for your purchase</p>
            </div>
            <Ticket
              eventDetails={event}
              userDetails={{
                name: userDetails.name,
                seatNumber: selectedSeat,
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
