import {useState, useEffect} from "react"
export default function ChooseSeats() {
    const [seats, setSeats] = useState([])
    
    useEffect(() => {
      seats.forEach(seat => {
        document.getElementById(`row${seat.row}seat-${seat.seat}`).classList.add("bg-white")
      });
    }, [seats])

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
          selectedSeats.push({ row: rowIndex, seat: i + 1});
        }
        setSeats(selectedSeats)
        
    }

    // eslint-disable-next-line
    const Seat = ({ seatNumber, rowNumber }) => (
        <div className={"bg-footerGrey seat lg:w-5 lg:h-5 md:w-8 md:h-8 w-5 h-5 cursor-pointer"} 
        key={seatNumber} id={`row${rowNumber}seat-${seatNumber}`} onClick={(event) => bookSeats(event, 4)}
        onMouseEnter={(event => handleMouseEnter(event, 4))}
        onMouseLeave={(event) => handleMouseLeave(event, 4)}
        >
        </div>
      );
    // eslint-disable-next-line
    const Row = ({ rowNumber }) => {
    const seats = Array.from({ length: 12 }, (_, index) => (
        <Seat key={index} seatNumber={index +1} rowNumber={rowNumber}/>
    ));
      
    return (
        <div className="flex justify-between w-full" key={rowNumber} id={`row-${rowNumber}`}>
        {seats}
        </div>
    );
    };
      
    const DivGenerator = () => {
    const rows = Array.from({ length: 8 }, (_, index) => (
        <Row key={index} rowNumber={index + 1} />
    ));
    
    return <div>{rows}</div>;
    };

  return (
    <div className="lg:w-80 md:w-[70%] w-[80%] container">
    <div className="screen">
    </div>
        {DivGenerator()}
    </div>
  )
}
