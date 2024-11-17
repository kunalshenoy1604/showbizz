export default function Ticket({ eventDetails, userDetails }) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">{eventDetails.title}</h2>
          <p className="text-white/90">{eventDetails.venue}</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <p className="font-bold">{eventDetails.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Time</p>
              <p className="font-bold">{eventDetails.time}</p>
            </div>
          </div>
  
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm">Ticket Holder</p>
            <p className="font-bold text-lg">{userDetails.name}</p>
          </div>
  
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm mb-2">Selected Seats</p>
            <div className="flex flex-wrap gap-2">
              {userDetails.seats.map(({ seatNumber, price }) => (
                <div 
                  key={seatNumber}
                  className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                >
                  <span className="font-bold">{seatNumber}</span>
                  <span className="text-gray-600"> - ₹{price}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="font-bold text-lg">₹{userDetails.totalPrice}</p>
          </div>
  
          <div className="flex justify-center border-t pt-6">
            <div className="w-32 h-32 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }