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

function buildBookingIdFilter(bookingId) {
  const parsedObjectId = parseObjectId(bookingId);

  if (parsedObjectId) {
    return { $or: [{ _id: parsedObjectId }, { _id: String(bookingId) }] };
  }

  return { _id: String(bookingId) };
}

async function findBookingById(db, bookingId) {
  const filter = buildBookingIdFilter(bookingId);
  return db.collection("bookings").findOne(filter);
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const db = await getDb();

    const existingBooking = await findBookingById(db, params.id);

    if (!existingBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    const ownershipFilter =
      body.userId || body.userEmail || existingBooking.userId || existingBooking.userEmail
        ? {
            $or: [
              ...(body.userId ? [{ userId: body.userId }] : []),
              ...(body.userEmail ? [{ userEmail: body.userEmail }] : []),
              ...(existingBooking.userId ? [{ userId: existingBooking.userId }] : []),
              ...(existingBooking.userEmail ? [{ userEmail: existingBooking.userEmail }] : []),
            ],
          }
        : null;

    if (!ownershipFilter) {
      return NextResponse.json(
        { message: "Missing booking owner" },
        { status: 400 },
      );
    }

    const filter = {
      ...buildBookingIdFilter(params.id),
      ...ownershipFilter,
    };

    const result = await db.collection("bookings").updateOne(filter, {
      $set: {
        patientName: body.patientName || "",
        gender: body.gender || "",
        phone: body.phone || "",
        appointmentDate: body.appointmentDate || "",
        appointmentTime: body.appointmentTime || "",
        userId: body.userId || existingBooking.userId || "",
        userEmail: body.userEmail || existingBooking.userEmail || "",
        doctorName: body.doctorName || existingBooking.doctorName || "",
        updatedAt: new Date(),
      },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Booking not found or not authorized" },
        { status: 404 },
      );
    }

    const updatedBooking = await findBookingById(db, params.id);

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
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const userId = searchParams.get("userId");
    const db = await getDb();

    const existingBooking = await findBookingById(db, params.id);

    if (!existingBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    const ownershipFilter =
      userId || email || existingBooking.userId || existingBooking.userEmail
        ? {
            $or: [
              ...(userId ? [{ userId }] : []),
              ...(email ? [{ userEmail: email }] : []),
              ...(existingBooking.userId ? [{ userId: existingBooking.userId }] : []),
              ...(existingBooking.userEmail ? [{ userEmail: existingBooking.userEmail }] : []),
            ],
          }
        : null;

    if (!ownershipFilter) {
      return NextResponse.json(
        { message: "Missing booking owner" },
        { status: 400 },
      );
    }

    const filter = {
      ...buildBookingIdFilter(params.id),
      ...ownershipFilter,
    };

    const result = await db.collection("bookings").deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Booking not found or not authorized" },
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
