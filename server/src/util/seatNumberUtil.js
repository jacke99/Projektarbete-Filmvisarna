export function calcSeatNumber(row, seat, seatsPerRow) {
    seat++
    if(row === 0) {
        return seat
    } else {
        return (row * seatsPerRow) + seat
    }
}