import { useState, useEffect, useMemo } from "react";
import {
  performRequest,
  performRequestAdmin,
} from "../../service/fetchService";
import { styles } from "../../styles.js";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../service/jwtService";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const authToken = sessionStorage.getItem("AuthToken");
    if (!authToken || authToken === "") {
      navigate("/");
    } else if (authToken) {
      const decoded = parseJwt(authToken);
      if (decoded.role !== "ADMIN") {
        navigate("/");
      }
    }
  }, [navigate]);

  //get bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const resp = await performRequestAdmin(
          "/api/bookings",
          "GET",
          null,
          page,
          query,
        );

        if (Array.isArray(resp)) {
          setBookings((prevBookings) => [...prevBookings, ...resp]);
        } else {
          console.error("Invalid response format:", resp);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings(page, query);
  }, [page, query]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //Cancel booking
  async function cancelBooking(cancelID, bookingId) {
    const resp = await performRequest("/api/bookings", "PATCH", {
      id: cancelID,
    });
    alert(`${resp.message} ${bookingId} är nu avbokad.`);
    const updatedBookingsResp = await performRequest("/api/bookings", "GET");
    setBookings(updatedBookingsResp);
  }

  const filteredBookings = useMemo(() => {
    return bookings?.filter((booking) => {
      const searchQuery = query.toLowerCase();
      const bookingIdIncludes = booking.bookingId
        .toLowerCase()
        .includes(searchQuery);
      const emailIncludes = booking.customerEmail
        .toLowerCase()
        .includes(searchQuery);
      const nameIncludes = booking.customer?.name
        .toLowerCase()
        .includes(searchQuery);
      const lastnameIncludes = booking.customer?.lastname
        .toLowerCase()
        .includes(searchQuery);
      const dateIncludes = booking.screening?.date
        .toLowerCase()
        .includes(searchQuery);

      return (
        bookingIdIncludes ||
        emailIncludes ||
        nameIncludes ||
        lastnameIncludes ||
        dateIncludes
      );
    });
  }, [bookings, query]);

  return (
    <div className="mt-12">
      <div className="m-auto flex max-w-fit flex-col justify-center">
        <div id="UserListHeader" className="flex items-end justify-between p-4">
          <h1 className="text-2xl text-white">BOKNINGAR</h1>
          <div className="flex gap-3">
            <input
              placeholder="Sök..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="filmTitle"
              name="filmTitle"
              className={`${styles.inputStyle}`}
            />
          </div>
        </div>

        <table id="table_users" className="w-full table-auto bg-white">
          <tbody>
            <tr className="px-3">
              <th>Namn</th>
              <th>Bokningsnr</th>
              <th>Sittplatser</th>
              <th>Biljetter</th>
              <th>Email</th>
              <th>Datum</th>
              <th></th>
            </tr>
            {filteredBookings &&
              filteredBookings.map((booking, key) => (
                <tr key={key} className="">
                  <td className="whitespace-nowrap">
                    {booking.customer?.name
                      ? `${booking.customer?.name} ${booking.customer?.lastname}`
                      : "Gäst"}
                  </td>
                  <td>{booking.bookingId}</td>
                  <td>
                    {booking.seats.map((seat, key) => {
                      if (key + 1 === booking.seats.length) {
                        return seat.seatNumber;
                      } else {
                        return seat.seatNumber + ", ";
                      }
                    })}
                  </td>
                  <td>
                    <p>
                      {booking.ticketType.adult >= 1
                        ? `Vuxen: ${booking.ticketType.adult}`
                        : null}
                    </p>
                    <p>
                      {booking.ticketType.child >= 1
                        ? `Barn: ${booking.ticketType.child}`
                        : null}
                    </p>
                    <p>
                      {booking.ticketType.senior >= 1
                        ? `Pensionär: ${booking.ticketType.senior}`
                        : null}
                    </p>
                  </td>

                  <td>{booking.customerEmail}</td>
                  <td className="whitespace-nowrap">
                    {booking.screening
                      ? `${new Date(
                          booking.screening.date,
                        ).toLocaleDateString()} ${booking.screening.time}`
                      : "Inte tillgängligt"}
                  </td>
                  <td className="p-4 text-center">
                    {booking.status ? (
                      <button
                        className={`self-center rounded-md bg-red-200 p-1 px-4 text-black-100 hover:bg-white active:bg-gold`}
                        onClick={() =>
                          cancelBooking(booking._id, booking.bookingId)
                        }
                      >
                        Avboka
                      </button>
                    ) : (
                      <span className="text-gray-500">Avbokad</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mb-8 mt-6 flex justify-center">
          <button className={`${styles.buttonStyle}`} onClick={loadMore}>
            Ladda fler
          </button>
        </div>
      </div>
    </div>
  );
}
