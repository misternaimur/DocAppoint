/** @format */

import { NextResponse } from "next/server";
import { getDb } from "../../lib/mongodb";

function serializeBooking(booking) {
  return {
    ...booking,
    _id: String(booking._id),
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    const filter =
      userId || email
        ? {
            $or: [
              ...(userId ? [{ userId }] : []),
              ...(email ? [{ userEmail: email }] : []),
            ],
          }
        : null;

    if (!filter) {
      return NextResponse.json([]);
    }

    const db = await getDb();
    const bookings = await db
      .collection("bookings")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings.map(serializeBooking));
  } catch (error) {
    console.error("Failed to load bookings", error);
    return NextResponse.json(
      { message: "Failed to load bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await getDb();

    const booking = {
      userId: body.userId || "",
      userEmail: body.userEmail || "",
      doctorName: body.doctorName || "",
      patientName: body.patientName || "",
      gender: body.gender || "",
      phone: body.phone || "",
      appointmentDate: body.appointmentDate || "",
      appointmentTime: body.appointmentTime || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("bookings").insertOne(booking);

    return NextResponse.json(
      {
        ...booking,
        _id: String(result.insertedId),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create booking", error);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 },
    );
  }
}
