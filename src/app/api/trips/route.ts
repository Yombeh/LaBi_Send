 import { createAdminClient } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Fetch profiles for each trip
  const tripsWithProfiles = await Promise.all(
    (data || []).map(async (trip) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone_number, address")
        .eq("id", trip.traveler_id)
        .single()

      return { ...trip, profiles: profile }
    })
  )

  return NextResponse.json(tripsWithProfiles)
}