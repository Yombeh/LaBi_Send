import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tripId = searchParams.get('trip_id')
  
  if (!tripId) {
    return NextResponse.json({ error: "No trip ID" }, { status: 400 })
  }
  
  const supabase = createAdminClient()
  
  const { data: trip } = await supabase
    .from("trips")
    .select("status, listing_fee_paid")
    .eq("id", tripId)
    .single()
  
  // Check if payment has been recorded
  const isPaid = trip?.status === 'pending' || trip?.listing_fee_paid === true
  
  return NextResponse.json({ 
    paid: isPaid,
    status: trip?.status 
  })
}