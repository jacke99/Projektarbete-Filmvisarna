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
    }

  
  
  return rows
}