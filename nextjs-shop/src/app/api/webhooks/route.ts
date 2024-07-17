import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return new Response('Invalid signature', { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      //@ts-ignore
      console.error('Webhook signature verification failed:', err.message);
      //@ts-ignore
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_details?.email) {
        console.error('Missing user email in session:', session);
        throw new Error('Missing user email');
      }

      const { userId, orderId } = session.metadata || { userId: null, orderId: null };

      if (!userId || !orderId) {
        console.error('Invalid request metadata:', session.metadata);
        throw new Error('Invalid request metadata');
      }

      const billingAddress = session.customer_details.address;
      const shippingAddress = session.shipping_details?.address;

      if (!billingAddress || !shippingAddress) {
        console.error('Missing address information:', session);
        throw new Error('Missing address information');
      }

      const updatedOrder = await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details.name!,
              city: shippingAddress.city!,
              country: shippingAddress.country!,
              postalCode: shippingAddress.postal_code!,
              street: shippingAddress.line1!,
              state: shippingAddress.state,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details.name!,
              city: billingAddress.city!,
              country: billingAddress.country!,
              postalCode: billingAddress.postal_code!,
              street: billingAddress.line1!,
              state: billingAddress.state,
            },
          },
        },
      });

      await resend.emails.send({
        from: 'CaseCobra <hello@joshtriedcoding.com>',
        to: [session.customer_details.email],
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          //@ts-ignore
          shippingAddress: {
            name: session.customer_details.name!,
            city: shippingAddress.city!,
            country: shippingAddress.country!,
            postalCode: shippingAddress.postal_code!,
            street: shippingAddress.line1!,
            state: shippingAddress.state,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    //@ts-ignore
    console.error('Error processing webhook:', err.message, err.stack);
    return NextResponse.json({ message: 'Something went wrong', ok: false }, { status: 500 });
  }
}
