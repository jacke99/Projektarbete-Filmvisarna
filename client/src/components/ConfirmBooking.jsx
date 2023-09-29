import { useState } from "react";

export default function ConfirmBooking() {
  const [bookingConfirmed, setBookingConfirmed] = useState(true);

  const handleCloseConfirmation = () => {
    setBookingConfirmed(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-5 shadow-md text-center">
      {bookingConfirmed && (
        <div className="booking-confirmation">
          <p>Your booking has been confirmed!</p>
          <button onClick={handleCloseConfirmation} className='booking-btn'>Close</button>
        </div>
      )}
    </div>
  );
}
