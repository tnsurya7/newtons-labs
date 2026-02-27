import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface EmailData {
    to: string;
    subject: string;
    html: string;
}

async function sendEmail(data: EmailData) {
    try {
        // Check if we have a Resend API key
        if (!process.env.RESEND_API_KEY) {
            // Fallback to console logging for development
            console.log('📧 Email would be sent (no API key configured):');
            console.log('To:', data.to);
            console.log('Subject:', data.subject);
            console.log('Body:', data.html);
            return { success: true, mode: 'development' };
        }

        // Initialize Resend only when API key is available
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send actual email using Resend
        const result = await resend.emails.send({
            from: 'Newton\'s Lab <onboarding@resend.dev>', // Use your verified domain later
            to: data.to,
            subject: data.subject,
            html: data.html,
        });

        console.log('✅ Email sent successfully:', result);
        return { success: true, data: result, mode: 'production' };
    } catch (error) {
        console.error('❌ Email sending failed:', error);

        // Fallback to console logging if email service fails
        console.log('📧 Fallback - Email content:');
        console.log('To:', data.to);
        console.log('Subject:', data.subject);
        console.log('Body:', data.html);

        throw error;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { to, subject, html } = body;

        if (!to || !subject || !html) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await sendEmail({ to, subject, html });

        return NextResponse.json({
            success: true,
            message: result.mode === 'development'
                ? 'Email logged to console (development mode)'
                : 'Email sent successfully',
            data: result,
        });
    } catch (error) {
        console.error('Email API error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email' },
            { status: 500 }
        );
    }
}