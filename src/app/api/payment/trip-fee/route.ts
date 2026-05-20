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

    const { trip_id, customer_phone, amount } = await request.json()


    console.log("Trip fee request:", { trip_id, customer_phone, amount })
    console.log("HexAi URL:", process.env.HEXAI_BASE_URL)
    console.log("API Key exists:", !!process.env.HEXAI_API_KEY)

    const response = await fetch(`${process.env.HEXAI_BASE_URL}/collections/initiate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HEXAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency: "GMD",
        client_reference: `TRIP-FEE-${trip_id}`,
        customer_phone,
        customer_name: "LaBi_Send Traveler"
      })
    })

    const responseText = await response.text()
    const data = JSON.parse(responseText)

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Payment failed" }, { status: 500 })
    }

    return NextResponse.json({
      wave_launch_url: data.data.redirect_url,
      transaction_id: data.data.transaction_id
    })

  } catch (err) {
    console.log("Trip fee error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}