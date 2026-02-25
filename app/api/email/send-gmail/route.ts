import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailData {
    to: string;
    subject: string;
    html: string;
}

async function sendEmailWithGmail(data: EmailData) {
    try {
        // Check if we have Gmail SMTP credentials
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('📧 Gmail SMTP not configured, email would be sent:');
            console.log('To:', data.to);
            console.log('Subject:', data.subject);
            console.log('Body:', data.html);
            return { success: true, mode: 'development' };
        }

        // Create transporter
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email
        const result = await transporter.sendMail({
            from: `"Newton's Lab" <${process.env.SMTP_USER}>`,
            to: data.to,
            subject: data.subject,
            html: data.html,
        });

        console.log('✅ Gmail email sent successfully:', result.messageId);
        return { success: true, data: result, mode: 'production' };
    } catch (error) {
        console.error('❌ Gmail email sending failed:', error);

        // Fallback to console logging
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

        const result = await sendEmailWithGmail({ to, subject, html });

        return NextResponse.json({
            success: true,
            message: result.mode === 'development'
                ? 'Email logged to console (Gmail SMTP not configured)'
                : 'Email sent successfully via Gmail',
            data: result,
        });
    } catch (error) {
        console.error('Gmail email API error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send email via Gmail' },
            { status: 500 }
        );
    }
}