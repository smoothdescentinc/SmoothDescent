import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    const { email } = await request.json();

    if (!email) {
        return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    try {
        const data = await resend.emails.send({
            from: 'SmoothDescent <noreply@smoothdescent.com>',
            to: [email],
            subject: 'Welcome to SmoothDescent! (10% Off Inside)',
            html: `
        <div style="font-family: sans-serif; color: #111;">
          <h1>Welcome to the family.</h1>
          <p>We're glad you're here.</p>
          <p>As promised, here is your 10% off code for your first order:</p>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">SMOOTH10</span>
          </div>
          <p>
            <a href="https://smoothdescent.com" style="color: #2563eb; text-decoration: none;">Shop Now &rarr;</a>
          </p>
        </div>
      `,
        });

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500 }
        );
    }
};
