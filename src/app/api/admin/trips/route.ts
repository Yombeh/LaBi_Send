import { createAdminClient } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/superbase-server"

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

  // Update trip status
  await supabase
    .from("trips")
    .update({ status })
    .eq("id", id)

  // If approved send email to traveler
  if (status === "active") {

    // Get trip details and traveler
    const { data: trip } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id)
      .single()

    if (trip) {
      // Get traveler email from auth
      const { data: travelerAuth } = await supabase.auth.admin.getUserById(trip.traveler_id)

      if (travelerAuth?.user?.email) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: travelerAuth.user.email,
            subject: "Your Trip is Now Live! 🎉 — LaBi_Send",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
                </div>
                <div style="padding: 40px 30px; background: #fdfaf7;">
                  <h2 style="color: #2c4a1e;">Your Trip is Live! 🎉</h2>
                  <p style="color: #555; line-height: 1.6;">
                    Great news! Your trip from <strong>${trip.from_city}</strong> to 
                    <strong>${trip.to_city}</strong> has been approved by our admin team 
                    and is now live on LaBi_Send.
                  </p>
                  <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #2c4a1e; margin-top: 0;">Trip Details</h3>
                    <table style="width: 100%;">
                      <tr>
                        <td style="color: #888; padding: 5px 0;">From</td>
                        <td style="color: #333; font-weight: bold;">${trip.from_city}</td>
                      </tr>
                      <tr>
                        <td style="color: #888; padding: 5px 0;">To</td>
                        <td style="color: #333; font-weight: bold;">${trip.to_city}</td>
                      </tr>
                      <tr>
                        <td style="color: #888; padding: 5px 0;">Departure</td>
                        <td style="color: #333; font-weight: bold;">${trip.departure_date}</td>
                      </tr>
                      <tr>
                        <td style="color: #888; padding: 5px 0;">Available KG</td>
                        <td style="color: #333; font-weight: bold;">${trip.available_kg} KG</td>
                      </tr>
                      <tr>
                        <td style="color: #888; padding: 5px 0;">Price Per KG</td>
                        <td style="color: #333; font-weight: bold;">D${trip.price_per_kg}</td>
                      </tr>
                    </table>
                  </div>
                  <p style="color: #555; line-height: 1.6;">
                    Customers can now find and book your available luggage space. 
                    You will be notified when a customer makes a booking request.
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/become-traveller/customer-list" 
                      style="background-color: #2c4a1e; color: white; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                      Go to My Dashboard →
                    </a>
                  </div>
                </div>
                <div style="background: #1a2e12; padding: 20px; text-align: center;">
                  <p style="color: #86efac; font-size: 12px; margin: 0;">
                    © 2025 LaBi_Send. Made with ❤️ in The Gambia
                  </p>
                </div>
              </div>
            `
          })
        })
      }
    }
  }

  return NextResponse.json({ success: true })
}