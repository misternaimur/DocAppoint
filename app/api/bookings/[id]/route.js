/** @format */

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

function parseObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function PUT(request, { params }) {
  try {
    const bookingId = parseObjectId(params.id);

    if (!bookingId) {
      return NextResponse.json(
        { message: "Invalid booking id" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const db = await getDb();

    const filter = {
      _id: bookingId,
      userEmail: body.userEmail,
    };

    await db.collection("bookings").updateOne(filter, {
      $set: {
        patientName: body.patientName || "",
        gender: body.gender || "",
        phone: body.phone || "",
        appointmentDate: body.appointmentDate || "",
        appointmentTime: body.appointmentTime || "",
        updatedAt: new Date(),
      },
    });

    const updatedBooking = await db.collection("bookings").findOne(filter);

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...updatedBooking,
      _id: String(updatedBooking._id),
    });
  } catch (error) {
    console.error("Failed to update booking", error);
    return NextResponse.json(
      { message: "Failed to update booking" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const bookingId = parseObjectId(params.id);

    if (!bookingId) {
      return NextResponse.json(
        { message: "Invalid booking id" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const db = await getDb();

    const filter = {
      _id: bookingId,
      ...(email ? { userEmail: email } : {}),
    };

    const result = await db.collection("bookings").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Failed to delete booking", error);
    return NextResponse.json(
      { message: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
