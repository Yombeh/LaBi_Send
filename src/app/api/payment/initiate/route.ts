import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/superbase-server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const userClient = await createServerSupabaseClient()
    const { data: { user } } = await userClient.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { booking_id, customer_phone, customer_name } = await request.json()

    console.log("Booking ID:", booking_id)
    console.log("Phone:", customer_phone)

    // Get booking details
    const supabase = createAdminClient()
    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*, trips(*)")
      .eq("id", booking_id)
      .single()

    console.log("Booking:", booking)
    console.log("Booking error:", error)

    if (error || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const amount = booking.kg_requested * booking.trips.price_per_kg 

    console.log("Amount in bututs:", amount)
    console.log("HexAi URL:", process.env.HEXAI_BASE_URL)
    console.log("API Key exists:", !!process.env.HEXAI_API_KEY)

const response = await fetch(`${process.env.HEXAI_BASE_URL}/collections/initiate`, {      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HEXAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency: "GMD",
        client_reference: `BOOKING-${booking_id}`,
        customer_phone,
        customer_name
      })
    })

    console.log("HexAi status:", response.status)
    const responseText = await response.text()
    console.log("HexAi body:", responseText)

    const data = JSON.parse(responseText)

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Payment failed" }, { status: 500 })
    }

    return NextResponse.json({
     wave_launch_url: data.data.redirect_url,
    transaction_id: data.data.transaction_id
    })

  } catch (err) {
    console.log("Caught error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}