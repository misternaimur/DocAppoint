/** @format */

import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGO_URL;
const dbName = "DocAppointdb";

if (!mongoUrl) {
  throw new Error("MONGO_URL is not set");
}

const globalForMongo = globalThis;

if (!globalForMongo._mongoClientPromise) {
  const client = new MongoClient(mongoUrl);
  globalForMongo._mongoClientPromise = client.connect();
}

export async function getDb() {
  const connectedClient = await globalForMongo._mongoClientPromise;
  return connectedClient.db(dbName);
}
