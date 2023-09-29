import { useState } from "react";

export default function ConfirmBooking() {
  const [bookingConfirmed, setBookingConfirmed] = useState(true);

  const handleCloseConfirmation = () => {
    setBookingConfirmed(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold z-50 p-5 shadow-md text-center">
      {bookingConfirmed && (
        <div className="booking-confirmation">
          <h1>Tack för din bokning!</h1>
          <p>dina bokade platser: stol 33, stol 32 rad 3</p>
          <p>dinmail@mail.com</p>
          <p>07633XXXXX</p>
          <button onClick={handleCloseConfirmation} className='booking-btn'>Close</button>
        </div>
      )}
    </div>
  );
}
