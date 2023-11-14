export function calcBestSeats(seatData, numberOfSeats) {
  let bestSeatGroup = null;
  let maxRatingSum = 0;

  for (let row = 0; row < seatData.length; row++) {
    const seatsInRow = seatData[row];

    for (let startSeat = 0; startSeat <= seatsInRow.length - numberOfSeats; startSeat++) {
      const seatGroup = seatsInRow.slice(startSeat, startSeat + numberOfSeats);

      // Check if the seats are available
      if (seatGroup.every(seat => !seat.seat)) {
        const ratingSum = seatGroup.reduce((sum, seat) => sum + seat.rating, 0);

        if (ratingSum > maxRatingSum) {
          maxRatingSum = ratingSum;
          bestSeatGroup = seatGroup;
        }
      }
    }
  }

  if (bestSeatGroup) {
    const rowIndex = seatData.findIndex(row => row.includes(bestSeatGroup[0]));
    const recommendedSeats = bestSeatGroup.map(seat => {
      const seatIndex = seatData[rowIndex].findIndex(s => s === seat);
      return {
        row: rowIndex + 1,
        seat: seatIndex + 1,
        seatNumber: seat.seatNumber,
        booked: false,
      };
    });
    return recommendedSeats;
  }

  return null;
}

