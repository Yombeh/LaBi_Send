 import { createAdminClient } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("traveler_details")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Fetch profiles for each application
  const applicationsWithProfiles = await Promise.all(
    (data || []).map(async (traveler) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone_number, address")
        .eq("id", traveler.profile_id)
        .single()

      return { ...traveler, profiles: profile }
    })
  )

  return NextResponse.json(applicationsWithProfiles)
}

export async function PATCH(request: Request) {
  const supabase = createAdminClient()
  const { id, status, profile_id, role } = await request.json()

  // Update traveler_details status
  await supabase
    .from("traveler_details")
    .update({ status })
    .eq("id", id)

  // Update profile role if needed
  if (role) {
    await supabase
      .from("profiles")
      .update({ role })
      .eq("id", profile_id)
  }

  return NextResponse.json({ success: true })
}