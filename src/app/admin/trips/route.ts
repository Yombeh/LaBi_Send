import { createAdminClient } from "@/lib/supabase-admin"
import { createServerSupabaseClient } from "@/lib/superbase-server"
import { NextResponse } from "next/server"

async function verifyAdmin() {
  const userClient = await createServerSupabaseClient()
  const { data: { user } } = await userClient.auth.getUser()

  if (!user) return null

  const supabase = createAdminClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") return null

  return user
}

export async function GET() {
  const user = await verifyAdmin()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const tripsWithProfiles = await Promise.all(
    (data || []).map(async (trip) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone_number")
        .eq("id", trip.traveler_id)
        .single()

      return { ...trip, profiles: profile }
    })
  )

  return NextResponse.json(tripsWithProfiles)
}

export async function PATCH(request: Request) {
  const user = await verifyAdmin()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { id, status } = await request.json()

  await supabase
    .from("trips")
    .update({ status })
    .eq("id", id)

  return NextResponse.json({ success: true })
}