import type { APIRoute } from 'astro';

export const prerender = false;

const PIXEL_ID = '3411322252377394';
const API_VERSION = 'v21.0';
const CAPI_ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

interface ConversionEvent {
    event_name: string;
    event_id: string;
    event_time?: number;
    event_source_url?: string;
    action_source: 'website';
    user_data: {
        em?: string;       // hashed email
        ph?: string;       // hashed phone
        fn?: string;       // hashed first name
        ln?: string;       // hashed last name
        ct?: string;       // hashed city
        st?: string;       // hashed state
        zp?: string;       // hashed zip
        country?: string;  // hashed country
        client_ip_address?: string;
        client_user_agent?: string;
        fbc?: string;      // click ID cookie
        fbp?: string;      // browser ID cookie
    };
    custom_data?: {
        value?: number;
        currency?: string;
        content_ids?: string[];
        content_type?: string;
        content_name?: string;
        content_category?: string;
        num_items?: number;
        order_id?: string;
    };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
    const accessToken = import.meta.env.META_CAPI_ACCESS_TOKEN;

    if (!accessToken) {
        console.error('[CAPI] Missing META_CAPI_ACCESS_TOKEN');
        return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    try {
        const body = await request.json();
        const {
            eventName,
            eventId,
            eventData = {},
            userData = {},
            sourceUrl,
            fbc,
            fbp
        } = body;

        if (!eventName || !eventId) {
            return new Response(JSON.stringify({ error: 'eventName and eventId required' }), { status: 400 });
        }

        // Build the conversion event
        const event: ConversionEvent = {
            event_name: eventName,
            event_id: eventId,
            event_time: Math.floor(Date.now() / 1000),
            event_source_url: sourceUrl || undefined,
            action_source: 'website',
            user_data: {
                ...userData,
                client_ip_address: clientAddress || undefined,
                client_user_agent: request.headers.get('user-agent') || undefined,
                fbc: fbc || undefined,
                fbp: fbp || undefined,
            },
            custom_data: {
                value: eventData.value,
                currency: eventData.currency || 'USD',
                content_ids: eventData.content_ids,
                content_type: eventData.content_type,
                content_name: eventData.content_name,
                content_category: eventData.content_category,
                num_items: eventData.num_items,
                order_id: eventData.transaction_id || eventData.order_id,
            }
        };

        // Remove undefined values from user_data and custom_data
        Object.keys(event.user_data).forEach(key => {
            if (event.user_data[key as keyof typeof event.user_data] === undefined) {
                delete event.user_data[key as keyof typeof event.user_data];
            }
        });

        if (event.custom_data) {
            Object.keys(event.custom_data).forEach(key => {
                if (event.custom_data![key as keyof typeof event.custom_data] === undefined) {
                    delete event.custom_data![key as keyof typeof event.custom_data];
                }
            });
        }

        // Send to Meta Conversions API
        const response = await fetch(`${CAPI_ENDPOINT}?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: [event],
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('[CAPI] Meta API error:', result);
            return new Response(JSON.stringify({ error: 'Meta API error', details: result }), { status: response.status });
        }

        console.log(`[CAPI] Event sent successfully: ${eventName} (${eventId})`);

        return new Response(JSON.stringify({ success: true, events_received: result.events_received }), { status: 200 });

    } catch (error) {
        console.error('[CAPI] Error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
