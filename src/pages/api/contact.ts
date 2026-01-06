import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Simple in-memory rate limiting
// Map<IP_Address, { count: number, resetTime: number }>
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (now > record.resetTime) {
        // Window expired, reset
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false; // Limit exceeded
    }

    // Increment
    record.count++;
    return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
    // Get IP. In Astro SSR, clientAddress is available.
    // In some hosting (Vercel), might need headers, but clientAddress is standard Astro.
    const ip = clientAddress || 'unknown';

    if (!checkRateLimit(ip)) {
        return new Response(JSON.stringify({
            message: 'Too many requests. Please try again later.'
        }), { status: 429 });
    }

    try {
        const { name, email, message, subject } = await request.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ message: 'Name, Email, and Message are required' }), { status: 400 });
        }

        // Send email to Admin (Company)
        const data = await resend.emails.send({
            from: 'SmoothDescent Contact <noreply@smoothdescent.com>',
            to: ['smoothdescentinc@gmail.com'],
            replyTo: email,
            subject: `New Contact: ${subject || 'General Inquiry'} from ${name}`,
            html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return new Response(JSON.stringify({ message: 'Error sending email' }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true, message: 'Message sent successfully!' }), { status: 200 });

    } catch (error) {
        console.error('Contact API Error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
