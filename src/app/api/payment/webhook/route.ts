import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"
import crypto from "crypto"

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get("x-hexai-signature")

  // Verify webhook signature
  const hash = crypto
    .createHmac("sha256", process.env.HEXAI_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex")

  if (signature !== hash) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const { event, data } = JSON.parse(rawBody)

if (event === "payment.success") {
  const supabase = createAdminClient()
  const reference = data.reference

  if (reference.startsWith("BOOKING-")) {
    // Customer booking payment
    const bookingId = reference.replace("BOOKING-", "")

    await supabase
      .from("bookings")
      .update({ paid: true, payment_method: "wave" })
      .eq("id", bookingId)

    await supabase
      .from("transactions")
      .insert({
        booking_id: bookingId,
        customer_id: data.customer_mobile,
        amount: parseFloat(data.amount),
        payment_method: "wave",
        transaction_ref: data.id
      })

 } else if (reference.startsWith("TRIP-FEE-")) {
  const tripId = reference.replace("TRIP-FEE-", "")

  // Get trip and traveler details
  const { data: trip } = await supabase
    .from("trips")
    .select("*, profiles!traveler_id(full_name)")
    .eq("id", tripId)
    .single()

  // Update trip status
  await supabase
    .from("trips")
    .update({ 
      status: "pending",
      listing_fee_paid: true,
      listing_fee_transaction_id: data.id
    })
    .eq("id", tripId)

  // Get traveler email from auth
  const { data: travelerAuth } = await supabase.auth.admin.getUserById(trip?.traveler_id)

  // Send confirmation email to traveler
  if (travelerAuth?.user?.email) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: travelerAuth.user.email,
        subject: "Payment Successful — Your Trip is Under Review 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
            </div>
            <div style="padding: 40px 30px; background: #fdfaf7;">
              <h2 style="color: #2c4a1e;">Payment Successful! 🎉</h2>
              <p style="color: #555; line-height: 1.6;">
                Your listing fee payment has been received successfully.
                Your trip from <strong>${trip?.from_city}</strong> to 
                <strong>${trip?.to_city}</strong> has been submitted for review.
              </p>
              <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #2c4a1e; margin-top: 0;">What happens next?</h3>
                <ul style="color: #555; line-height: 2;">
                  <li>📋 Our admin will review your flight ticket within <strong>24 hours</strong></li>
                  <li>✅ If approved — your trip goes live for customers to book</li>
                  <li>💰 If rejected — you will receive a full refund to your Wave account</li>
                </ul>
              </div>
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

  return NextResponse.json({ received: true })
}
}
}