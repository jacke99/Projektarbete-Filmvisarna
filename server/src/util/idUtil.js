import { fetchCollection } from "../mongo/mongoClient.js";

async function CreateId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const check = await checkID(result)
    if(check) {
        return result;
    } else {
        CreateId(6)
    }
    
}

async function checkID(id) {
    const bookingsCollection = await fetchCollection("bookings").find().toArray()

    const idMatch = bookingsCollection.find(e => e.bookingId == id)
    if(idMatch) {
        return false
    } else {
        return true
    }
}


export default {CreateId}

