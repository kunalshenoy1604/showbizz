import { useState, useEffect } from "react";

const PRICE_ZONES = {
  premium: { color: "bg-purple-200 hover:bg-purple-300", price: 8500 },
  standard: { color: "bg-green-200 hover:bg-green-300", price: 6500 },
  economy: { color: "bg-yellow-200 hover:bg-yellow-300", price: 3500 },
};

export default function SeatSelector({ availableSeats, onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]); // Safe initialization
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;

  const getSeatZone = (row, seatNumber) => {
    if (row === "A" || row === "B") return "premium"; // Purple: premium
    if ((row === "C" || row === "D") && seatNumber >= 3 && seatNumber <= 7) return "standard"; // Green: standard
    return "economy"; // Yellow: economy
  };

  const handleSeatClick = (row, number) => {
    const seatNumber = `${row}${number}`;
    const zone = getSeatZone(row, number);
    const price = PRICE_ZONES[zone].price;

    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.seatNumber === seatNumber);
      const newSeats = isSelected
        ? prev.filter((s) => s.seatNumber !== seatNumber)
        : [...prev, { seatNumber, price }];
      onSeatSelect(newSeats); // Notify parent about selection
      return newSeats;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Stage Representation */}
      <div className="w-full h-8 bg-gray-300 rounded-t-lg mb-8 flex items-center justify-center text-sm font-medium">
        STAGE
      </div>

      {/* Seat Layout */}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-center font-medium">{row}</span>
            <div className="flex gap-2">
              {[...Array(seatsPerRow)].map((_, index) => {
                const seatNumber = `${row}${index + 1}`;
                const zone = getSeatZone(row, index + 1);
                const { color } = PRICE_ZONES[zone];
                const isSelected = selectedSeats.some((s) => s.seatNumber === seatNumber);

                return (
                  <button
                    key={seatNumber}
                    onClick={() => handleSeatClick(row, index + 1)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors
                      ${isSelected ? "bg-blue-600 text-white" : color}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Legend */}
      <div className="mt-8 flex gap-6 justify-end">
        {Object.entries(PRICE_ZONES).map(([zone, { color, price }]) => (
          <div key={zone} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${color.split(" ")[0]} rounded`} />
            <span className="text-sm font-medium">₹{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
