/** @format */

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db("DocAppointdb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // provide the client so adapters that use transactions can work
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      // 7 days in seconds
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
