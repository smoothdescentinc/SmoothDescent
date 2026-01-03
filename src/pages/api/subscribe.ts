import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { email, phone } = await request.json();

  if (!email || !phone) {
    return new Response(JSON.stringify({ message: 'Email and Phone are required' }), { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: 'SmoothDescent <noreply@smoothdescent.com>',
      to: [email],
      subject: 'Welcome to the family',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #4A3C47; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h1 style="color: #4A3C47; font-family: serif; font-size: 28px; margin-bottom: 24px;">Welcome to the family.</h1>
          
          <p style="font-size: 16px; margin-bottom: 16px;">Hi there,</p>
          
          <p style="font-size: 16px; margin-bottom: 16px;">We know that managing your metabolic health can feel like a lonely journey sometimes. That's exactly why we started SmoothDescent.</p>
          
          <p style="font-size: 16px; margin-bottom: 24px;">Our goal is to support you every step of the way with clean, science-backed nutrition designed specifically for your needs. We're honored to be a small part of your success story.</p>
          
          <p style="font-size: 16px; margin-bottom: 16px;">To help you get started, here is your exclusive welcome gift:</p>
          
          <div style="background: #FAF7F2; border: 1px solid #E8D5B7; padding: 30px; border-radius: 4px; text-align: center; margin: 30px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #4A3C47;">Use Code at Checkout</p>
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #4A3C47; display: block; margin-bottom: 10px;">SMOOTH15</span>
            <p style="margin: 0; font-size: 13px; color: #888;">Expires in 48 hours</p>
          </div>
          
          <p style="text-align: center;">
            <a href="https://smoothdescent.com" style="background-color: #4A3C47; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Shop Now</a>
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
            <p>SmoothDescent Inc.</p>
            <p>If you have any questions, just reply to this email. We're here for you.</p>
          </div>
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
