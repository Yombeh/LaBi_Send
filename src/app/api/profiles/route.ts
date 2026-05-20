import { createAdminClient } from "@/lib/supabase-admin"
import { createServerSupabaseClient } from "@/lib/superbase-server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()
  const userClient = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await userClient.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(profile)
}

export async function PATCH(request: Request) {
  const supabase = createAdminClient()
  const userClient = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await userClient.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("profiles")
    .update(body)
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}