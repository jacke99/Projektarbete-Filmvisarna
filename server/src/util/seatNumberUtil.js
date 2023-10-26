export function calcSeatNumber(row, seat, previousSeatNumber) {
    // console.log(previousSeatNumber);
    if(row == 0) {
        return seat + 1
    } else {
        return previousSeatNumber + seat + 1
    }
}