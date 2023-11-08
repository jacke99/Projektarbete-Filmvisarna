export function calcBestSeats(seatData, numberOfSeats) {

  const allSeats = seatData.flat();

  const availableSeats = allSeats.filter(seat => seat.seat === false);

  availableSeats.sort((a, b) => b.rating - a.rating);

  let bestBlock = [];
  let currentBlock = [];

  for (const seat of availableSeats) {
    seat.booked = false;
    if (currentBlock.length === 0) {
      currentBlock.push({ ...seat, row: seatData.findIndex(row => row.includes(seat)) + 1 });
    } else {
      // Check if the seat is adjacent to the last seat in the current block
      if (seat.seatNumber === currentBlock[currentBlock.length - 1].seatNumber + 1) {
        currentBlock.push({ ...seat, row: seatData.findIndex(row => row.includes(seat)) + 1 });
      } else {
        // Start a new block
        currentBlock = [{ ...seat, row: seatData.findIndex(row => row.includes(seat)) + 1 }];
      }

      // Check if the current block is equal to or greater than the specified number of seats
      if (currentBlock.length >= numberOfSeats) {
        bestBlock = currentBlock;
        break; // Stop searching once we find a block with the desired number of seats
      }
    }
  }

  return bestBlock;
}
