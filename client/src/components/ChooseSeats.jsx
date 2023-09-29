

export default function ChooseSeats() {

    function bookSeats(event, numberOfSeats) {
        const target = event.target 
        const parent = event.target.parentElement
        
        const seatIndex = parseInt(target.id, 10);
        const rowId = parseInt(parent.id, 10);
      
        const startSeatIndex = Math.max(0, seatIndex - Math.floor(numberOfSeats / 2));
        const endSeatIndex = Math.min(startSeatIndex + numberOfSeats - 1, 11);
      
        const selectedSeats = [];
      
        for (let i = startSeatIndex; i <= endSeatIndex; i++) {
          selectedSeats.push({ row: rowId, seat: i + 1});
        }
      
        console.table(selectedSeats);
        console.log(target.id)
    }

    // eslint-disable-next-line
    const Seat = ({ seatNumber }) => (
        <div className={"bg-footerGrey seat lg:w-5 lg:h-5 md:w-8 md:h-8 w-5 h-5 cursor-pointer"} 
        key={seatNumber} id={seatNumber + 1} onClick={(event) => bookSeats(event, 4)}
        >
        </div>
      );
    // eslint-disable-next-line
    const Row = ({ rowNumber }) => {
    const seats = Array.from({ length: 12 }, (_, index) => (
        <Seat key={index} seatNumber={index} />
    ));
      
    return (
        <div className="flex justify-between w-full" key={rowNumber} id={rowNumber + 1}>
        {seats}
        </div>
    );
    };
      
    const DivGenerator = () => {
    const rows = Array.from({ length: 8 }, (_, index) => (
        <Row key={index} rowNumber={index} />
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
