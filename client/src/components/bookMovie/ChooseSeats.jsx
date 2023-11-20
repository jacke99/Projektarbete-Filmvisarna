import { useEffect, useState } from "react"
import { useStates } from "react-easier"
import { calcBestSeats } from "../../service/calcBestSeats"
import PropTypes from "prop-types"
import SeperateSeatsToggle from "./SeperateSeatsToggle";


export default function ChooseSeats({ screening, seats, setSeats}) {
    const [toggle, setToggle] = useState(false)
    const s = useStates("toggleSeparateSeats")
   
    const counters = useStates("ticketCounter");
    
    useEffect(() => {
      seats.forEach(seat => {
        document.getElementById(`row${seat.row}seat-${seat.seat}`).classList.add("bg-white")
      });
    }, [seats])
    
    
    useEffect(() => {
     const recommendedSeats = calcBestSeats(screening.seats, counters.total)
     if(recommendedSeats) {
      setSeats(recommendedSeats)
     }
     //eslint-disable-next-line
    }, [screening, setSeats])

    function handleMouseEnter(event, numberOfSeats) {
        const target = event.target 
        const parent = event.target.parentElement
        // eslint-disable-next-line
        const [prefix, seatId] = target.id.split('-');
        // eslint-disable-next-line
        const [prefix2, row] = parent.id.split('-');
        const seatIndex = parseInt(seatId, 10);
        const rowIndex = parseInt(row, 10);
      
        const startSeatIndex = Math.max(0, seatIndex - numberOfSeats);
        const endSeatIndex = Math.min(startSeatIndex + numberOfSeats - 1, 11);
        

        const hoveringSeats = [];
      
        for (let i = startSeatIndex; i <= endSeatIndex; i++) {
          hoveringSeats.push({ row: rowIndex, seat: i + 1});
        }
        hoveringSeats.forEach(seat => {
          document.getElementById(`row${seat.row}seat-${seat.seat}`).classList.add("bg-gold")
        });
        
    }

    function handleMouseLeave(event, numberOfSeats) {
      const target = event.target 
        const parent = event.target.parentElement
        // eslint-disable-next-line
        const [prefix, seatId] = target.id.split('-');
        // eslint-disable-next-line
        const [prefix2, row] = parent.id.split('-');
        const seatIndex = parseInt(seatId, 10);
        const rowIndex = parseInt(row, 10);
      
        const startSeatIndex = Math.max(0, seatIndex - numberOfSeats);
        const endSeatIndex = Math.min(startSeatIndex + numberOfSeats - 1, 11);
      
        const hoveringSeats = [];
      
        for (let i = startSeatIndex; i <= endSeatIndex; i++) {
          hoveringSeats.push({ row: rowIndex, seat: i + 1});
        }
        hoveringSeats.forEach(seat => {
          document.getElementById(`row${seat.row}seat-${seat.seat}`).classList.remove("bg-gold")
        });
    }
    
    function bookSeats(event, numberOfSeats) {
        setSeats([])
        setToggle(false)
        const target = event.target 
        const parent = event.target.parentElement
        // eslint-disable-next-line
        const [prefix, seatId] = target.id.split('-');
        // eslint-disable-next-line
        const [prefix2, row] = parent.id.split('-');
        const seatIndex = parseInt(seatId, 10);
        const rowIndex = parseInt(row, 10);
      
        const startSeatIndex = Math.max(0, seatIndex - numberOfSeats);
        const endSeatIndex = Math.min(startSeatIndex + numberOfSeats - 1, 11);
      
        const selectedSeats = [];
        
        for (let i = startSeatIndex; i <= endSeatIndex; i++) {
          if(screening.seats[rowIndex - 1][i].seat) {
            return setToggle(true)
          } else {
            selectedSeats.push({ row: rowIndex, seat: i + 1, seatNumber: screening.seats[rowIndex - 1][i].seatNumber, booked: screening.seats[rowIndex - 1][i].seat});
          }
          
        }
        setSeats(selectedSeats)
    }

    function bookSeparateSeats(event) {
      const target = event.target;
      const parent = event.target.parentElement;
      // eslint-disable-next-line
      const [prefix, seatId] = target.id.split('-');
      // eslint-disable-next-line
      const [prefix2, row] = parent.id.split('-');
      const seatIndex = parseInt(seatId, 10);
      const rowIndex = parseInt(row, 10);
      
      const selectedSeats = [...seats];
      console.log(seatIndex);
    
      // Check if the seat is already selected
      const isSeatSelected = selectedSeats.find(
        seat => seat.row === rowIndex && seat.seat === seatIndex
      );
    
      if (!isSeatSelected) {
        if (selectedSeats.length === counters.total) {
          selectedSeats.shift();
        }
        
        selectedSeats.push({
          row: rowIndex,
          seat: seatIndex,
          seatNumber: screening.seats[rowIndex - 1][seatIndex - 1].seatNumber,
          booked: screening.seats[rowIndex - 1][seatIndex - 1].seat
        });
        
        setSeats(selectedSeats);
      }
    }
    

    // eslint-disable-next-line
    const Seat = ({ seatNumber, rowNumber, booked }) => (
        <button className={`${booked ? "bg-red-600" : "bg-footerGrey cursor-pointer"} seat lg:w-10 lg:h-7 md:w-8 md:h-8 w-5 h-5 `} 
        key={seatNumber} id={`row${rowNumber}seat-${seatNumber}`} onClick={(event) => booked ? undefined : s.toggle ? bookSeparateSeats(event) : bookSeats(event, counters.total)}
        onMouseEnter={(event) => s.toggle ? handleMouseEnter(event, 1) : handleMouseEnter(event, counters.total)}
        onMouseLeave={(event) => s.toggle ? handleMouseLeave(event, 1) : handleMouseLeave(event, counters.total)}
        disabled={booked}
        >
        </button>
      );
    // eslint-disable-next-line
    const Row = ({ rowNumber }) => {
    const seats = screening.seats[rowNumber - 1].map((seat, index) => (
        <Seat key={index} seatNumber={index +1} rowNumber={rowNumber} booked={seat.seat} className="test"/>
    ));
    return (
        <div className="flex justify-center w-full sm:gap-2 mb-2" key={rowNumber} id={`row-${rowNumber}`}>
        {seats}
        </div>
    );
    };
      
    const SeatGenerator = () => {
    const rows = screening.seats.map((row, index) => (
        <Row key={index} rowNumber={index + 1} />
    ));
    return <div>{rows}</div>;
    };
  return (
    <div className="lg:w-[700px] md:w-[70%] w-[80%] container mt-5">
      <SeperateSeatsToggle setSeats={setSeats}/>
    <div className="screen mb-7 mt-4">
    </div>
        {SeatGenerator()}
        <div className="text-white text-center mt-2 mb-4">
          <p>Antal biljetter:  {counters.total}</p>
          {seats.length > 0 && !s.toggle ? <p>
           Rad: {seats.length && seats[0].row + " -"} Plats:{" "}
          {seats && seats?.map((seat, i) => {
            if(i + 1 === seats.length) {
             return seat.seatNumber
            } else {
             return seat.seatNumber + ", "
            }
            })}
          </p>: <p>
           Plats:{" "}
          {seats && seats?.map((seat, i) => {
            if(i + 1 === seats.length) {
             return seat.seatNumber
            } else {
             return seat.seatNumber + ", "
            }
            })}
          </p>}
          {toggle && <p className="text-red-500">Välj andra säten, ett eller flera säten av dom du försökte välja är redan bokade</p>}
        </div>
    </div>
  )
}


ChooseSeats.propTypes = {
  screening: PropTypes.object,
  seats: PropTypes.array,
  setSeats: PropTypes.func
}