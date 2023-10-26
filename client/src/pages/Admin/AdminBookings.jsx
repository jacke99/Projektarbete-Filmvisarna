import { useState, useEffect } from "react"
import AdminHeader from "../../components/adminPage/AdminHeader"
import { performRequest } from "../../service/fetchService"
import { styles } from "../../styles.js";
import { resolvePath } from "react-router-dom";



export default function AdminBookings() {
    const [bookings, setBookings] = useState(undefined)
    const [searchInput, setSearchInput] = useState("")
    const [filteredBookings, setFilteredBookings] = useState("")


    //get bookings
    useEffect(() => {  
    async function getBookings() {
        const resp = await performRequest("/api/bookings", "GET")
        setBookings(resp)
    }
    getBookings()
    }, [])

    //Cancel booking
    async function cancelBooking(cancelID, bookingId ) {
        const resp = await performRequest("/api/bookings", "PATCH", {id: cancelID})
        alert(`${resp.message} ${bookingId} är nu avbokad.`)
        const updatedBookingsResp = await performRequest("/api/bookings", "GET")
        setBookings(updatedBookingsResp)
    }

    /* 
    //Location searchInput plockas ut och läggs in i userSearch
    const theUserSearch = window.location.searchInput; 
    console.log(theUserSearch);

    //Vi använder URLSearchParams för att plocka ut användarens sökning
    const urlParams = new URLSearchParams(theUserSearch);
    
    //Vi kan plocka ut stringen ur sökningen genom urlParams.get
    const param = urlParams.get("bokningsnummer");
    console.log(param);

*/

    //hanterar förändringar i sökfältet
    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
        console.log(searchInput);
        setBookings(filterList(bookings, searchInput));
    };

    function filterList(list, Input) {
    return list.filter((item) => item.bookingId.toLowerCase().includes(Input.toLowerCase()));
    }

    //filtrerar listan med bokningar if condition is met LOOOOP never ending what to do
    // if (searchInput.length > 0) {
    //     }


    console.log(searchInput);
    
    return (
        <div className="mt-20 mx-12">
            <AdminHeader/>
            <div className="max-w-fit flex flex-col justify-center m-auto">

            <div id="UserListHeader" className="flex justify-between items-end p-4">            
                <h1 className="text-2xl text-white">BOKNINGAR</h1>
                <div className="flex gap-3">
                        <input placeholder="Sök..." type="text" value={searchInput} onChange={handleChange} id="filmTitle" name="filmTitle" className={`${styles.inputStyle}`}/>
                        {/* <button type="submit" className={`rounded-md bg-gold p-1 px-4 text-black-100 w-16 self-center`}>Sök
                        </button> */}
                </div>
            </div>

            <table id="table_users" className="w-full table-auto bg-white">
                <tbody>
                    <tr className="px-3" >
                        <th>Namn</th>
                        <th>Bokningsnr</th>
                        <th>Sittplatser</th>
                        <th>Biljetter</th>
                        <th></th>
                    </tr>
                {bookings && bookings.map((booking, key) => {

                    if (booking.status)  {     
                    return (
                    <tr key={key} className="">
                        <td>{`${booking.customer.name} ${booking.customer.lastname}`}</td>
                        <td>{booking.bookingId}</td>
                        <td>{booking.seats.map((seat, key)=> {
                            if(key + 1 === booking.seats.length) {
                            
                            return seat.seatNumber
                            } else {
                                    return seat.seatNumber + ", "
                            }} 
                        )}      
                        </td>
                        <td>
                            <p>{booking.ticketType.adult >= 1 ? `Vuxen: ${booking.ticketType.adult}` : null}</p>
                            <p>{booking.ticketType.child >= 1 ? `Barn: ${booking.ticketType.child}` : null}</p>
                            <p>{booking.ticketType.senior >= 1 ? `Pensionär: ${booking.ticketType.senior}` : null}</p>
                        </td>

                        <td className="p-4 text-center">
                            <button
                                className={`rounded-md bg-red-200 p-1 px-4 text-black-100 self-center`}
                                onClick={() => cancelBooking(booking._id, booking.bookingId)}
                            >
                                Avboka
                            </button>
                        </td>            
                    </tr> )  
                        }
                    })
                }
        
                </tbody>
            </table>
        </div>
    </div>
    )
}