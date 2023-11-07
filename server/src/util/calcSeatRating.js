export function calcSeatRating(rows, seats) {
  let middleRow = rows.length / 2 
  let rating = 0
  
  if(rows.length % 2 === 0) {
    middleRow = Math.ceil(middleRow)
  }
    for(let i = 0; i < rows.length; i++) {
        if(i <= middleRow) {
          if(i !== middleRow && rows.length % 2 === 0) {
            rating++
          } else if(i !== middleRow && rows.length % 2 !== 0) {
            rating++
          }
          rows[i].rating = rating
        } else {
          rating--
          rows[i].rating = rating
        }
        let seatRating = rows[i].rating
        let middleSeat = rows[i].seats / 2
        for(let j = 0; j < rows[i].seats; j++) {
            if(j <= middleSeat) {
                if(j !== middleSeat && rows[i].seats % 2 === 0) {
                    seatRating++
                } else if(j !== middleSeat && rows[i].seats % 2 !== 0) {
                    seatRating++
                }
                seats[i][j].rating = seatRating
            } else {
                seatRating--
                seats[i][j].rating = seatRating
            }
        }
    }

  
  
  return seats
}