 import { Resend } from "resend"
import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email } = await request.json()

  // Save to database
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("subscribers")
    .insert({ email })

  if (error && error.code !== "23505") {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send welcome email
  await resend.emails.send({
    from: "LaBi_Send <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to the LaBi_Send Community! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        
        <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">
            LaBi<span style="color: #f5c842;">_Send</span>
          </h1>
          <p style="color: #86efac; margin: 5px 0 0;">Connecting travelers & senders across borders</p>
        </div>

        <div style="padding: 40px 30px; background: #fdfaf7;">
          <h2 style="color: #2c4a1e;">Welcome to the Community! 🎉</h2>
          <p style="color: #555; line-height: 1.6;">
            Thank you for subscribing to LaBi_Send. You are now part of a growing community 
            that is changing how West Africa sends packages across borders.
          </p>

          <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #2c4a1e; margin-top: 0;">What you will get:</h3>
            <ul style="color: #555; line-height: 2;">
              <li>✦ Exclusive shipping deals & discounts</li>
              <li>✦ New traveler route announcements</li>
              <li>✦ Community stories & shipping tips</li>
              <li>✦ Early access to new features</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a 
              href="https://labisend.com/trips" 
              style="background-color: #2c4a1e; color: white; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;"
            >
              Find a Traveler Now →
            </a>
          </div>

          <p style="color: #999; font-size: 12px; text-align: center;">
            You received this email because you subscribed to LaBi_Send updates.<br/>
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>

        <div style="background: #1a2e12; padding: 20px; text-align: center;">
          <p style="color: #86efac; font-size: 12px; margin: 0;">
            © 2025 LaBi_Send. Made with ❤️ in The Gambia
          </p>
        </div>

      </div>
    `
  })

  return NextResponse.json({ success: true })
}