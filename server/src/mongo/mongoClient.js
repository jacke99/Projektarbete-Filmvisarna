import * as dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

let db = undefined;

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://${process.env.appUsername}:${process.env.appPassword}@cluster0.rxwvpwp.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(process.env.appDataBaseName); // Samling av collections (skapas dynamisk, har ej skapats explicit i atlas)

  return db;
}

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}
