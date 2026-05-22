import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const data = await request.json()

        const name = String(data.name || '').trim()
        const email = String(data.email || '').trim()
        const subject = String(data.subject || 'General Inquiry').trim()
        const message = String(data.message || '').trim()
        const recaptchaToken = String(data.recaptcha_token || '').trim()

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Name, email and message are required.',
                },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email address.',
                },
                { status: 400 }
            )
        }

        if (!recaptchaToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please complete the reCAPTCHA.',
                },
                { status: 400 }
            )
        }

        // Verify reCAPTCHA
        const verifyResponse = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: recaptchaToken,
                }),
            }
        )

        const verifyData = await verifyResponse.json()

        if (!verifyData.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'reCAPTCHA verification failed.',
                },
                { status: 403 }
            )
        }

        // SMTP Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        const html = `
      <html>
        <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
          <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;">
            
            <div style="background:linear-gradient(135deg,#D6008D,#732c7c);padding:24px;color:#fff;">
              <h2 style="margin:0;">New Contact Form Submission</h2>
            </div>

            <div style="padding:24px;">
              <p><strong>Name:</strong> ${name}</p>

              <p><strong>Email:</strong> ${email}</p>

              <p><strong>Inquiry Type:</strong> ${subject}</p>

              <p>
                <strong>Message:</strong><br/><br/>
                ${message.replace(/\n/g, '<br/>')}
              </p>
            </div>

          </div>
        </body>
      </html>
    `

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_TO_EMAIL,
            subject: `New Inquiry: ${subject} — from ${name}`,
            html,
            replyTo: email,
        })

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully.',
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                success: false,
                message: 'Something went wrong. Please try again.',
            },
            { status: 500 }
        )
    }
}