import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase-admin"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Save to database
    const { error } = await supabase
      .from("contacts")
      .insert({ name, email, subject, message })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send notification email to admin
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "support@labisend.com",
        subject: `New Contact Form Message — ${subject || "General Inquiry"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
              <p style="color: #86efac;">New Contact Form Submission</p>
            </div>
            <div style="padding: 40px 30px; background: #fdfaf7;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e8ddd0;">
                  <td style="padding: 10px; font-weight: bold; color: #2c4a1e; width: 30%;">Name</td>
                  <td style="padding: 10px; color: #555;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e8ddd0;">
                  <td style="padding: 10px; font-weight: bold; color: #2c4a1e;">Email</td>
                  <td style="padding: 10px; color: #555;">${email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e8ddd0;">
                  <td style="padding: 10px; font-weight: bold; color: #2c4a1e;">Subject</td>
                  <td style="padding: 10px; color: #555;">${subject || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #2c4a1e;">Message</td>
                  <td style="padding: 10px; color: #555;">${message}</td>
                </tr>
              </table>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" 
                  style="background-color: #2c4a1e; color: white; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;">
                  View in Admin Panel →
                </a>
              </div>
            </div>
          </div>
        `
      })
    })

    // Send confirmation email to user
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "We received your message — LaBi_Send",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #2c4a1e; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">LaBi<span style="color: #f5c842;">_Send</span></h1>
            </div>
            <div style="padding: 40px 30px; background: #fdfaf7;">
              <h2 style="color: #2c4a1e;">We received your message! ✅</h2>
              <p style="color: #555; line-height: 1.6;">
                Hello ${name}, thank you for reaching out to LaBi_Send.
                Our team will get back to you within 24 hours at ${email}.
              </p>
              <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <p style="color: #888; font-size: 14px; margin: 0;"><strong>Your message:</strong></p>
                <p style="color: #555; margin: 10px 0 0;">${message}</p>
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

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}