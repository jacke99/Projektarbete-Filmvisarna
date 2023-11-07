import { useState, useEffect, useMemo } from "react"
import AdminNavigation from "../../components/adminPage/AdminNavigation";
import { performRequest } from "../../service/fetchService"
import { styles } from "../../styles.js";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../service/jwtService";




export default function AdminBookings() {
    const [bookings, setBookings] = useState(undefined)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const authToken = sessionStorage.getItem("AuthToken");
        if (!authToken || authToken === "") {
            navigate("/")
        } else if (authToken) {
            const decoded = parseJwt(authToken)
            if (decoded.role !== "ADMIN") {
                navigate("/")
            }
        }
    }, [navigate])

    //get bookings
    useEffect(() => {
        async function getBookings() {
            const resp = await performRequest("/api/bookings", "GET")
            setBookings(resp)
        }
        getBookings()
    }, [])

    //Cancel booking
    async function cancelBooking(cancelID, bookingId) {
        const resp = await performRequest("/api/bookings", "PATCH", { id: cancelID })
        alert(`${resp.message} ${bookingId} är nu avbokad.`)
        const updatedBookingsResp = await performRequest("/api/bookings", "GET")
        setBookings(updatedBookingsResp)
    }

    //Search
    const filteredBookings = useMemo(() => {

        return bookings?.filter(booking => {
            return booking.bookingId.toLowerCase().includes(query.toLowerCase()) || booking.customerEmail.toLowerCase().includes(query.toLowerCase()) || booking.customer?.name.toLowerCase().includes(query.toLowerCase()) || booking.customer?.lastname.toLowerCase().includes(query.toLowerCase())
        })
    }, [bookings, query])

    return (
        <div className="mt-12">
            <AdminNavigation />
            <div className="max-w-fit flex flex-col justify-center m-auto">

                <div id="UserListHeader" className="flex justify-between items-end p-4">
                    <h1 className="text-2xl text-white">BOKNINGAR</h1>
                    <div className="flex gap-3">
                        <input placeholder="Sök..." type="text" value={query} onChange={e => setQuery(e.target.value)} id="filmTitle" name="filmTitle" className={`${styles.inputStyle}`} />
                    </div>
                </div>

                <table id="table_users" className="w-full table-auto bg-white">
                    <tbody>
                        <tr className="px-3" >
                            <th>Namn</th>
                            <th>Bokningsnr</th>
                            <th>Sittplatser</th>
                            <th>Biljetter</th>
                            <th>Email</th>
                            <th>Datum</th>
                            <th></th>


                        </tr>
                        {filteredBookings && filteredBookings.map((booking, key) => {

                            if (booking.status) {
                                return (
                                    <tr key={key} className="">
                                        <td>{booking.customer?.name ? `${booking.customer?.name} ${booking.customer?.lastname}` : "Gäst"}</td>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.seats.map((seat, key) => {
                                            if (key + 1 === booking.seats.length) {

                                                return seat.seatNumber
                                            } else {
                                                return seat.seatNumber + ", "
                                            }
                                        }
                                        )}
                                        </td>
                                        <td>
                                            <p>{booking.ticketType.adult >= 1 ? `Vuxen: ${booking.ticketType.adult}` : null}</p>
                                            <p>{booking.ticketType.child >= 1 ? `Barn: ${booking.ticketType.child}` : null}</p>
                                            <p>{booking.ticketType.senior >= 1 ? `Pensionär: ${booking.ticketType.senior}` : null}</p>
                                        </td>

                                        <td>{booking.customerEmail}</td>
                                        <td>{"Bokningens datum"}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                className={`rounded-md bg-red-200 p-1 px-4 text-black-100 self-center`}
                                                onClick={() => cancelBooking(booking._id, booking.bookingId)}
                                            >
                                                Avboka
                                            </button>
                                        </td>

                                    </tr>)
                            }
                        })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}