import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendConfirmationEmail } from '@/lib/email/send-confirmation';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get reservation details with activity information
    const { data: reservation, error: fetchError } = await supabase
      .from('reservations')
      .select(
        `
        *,
        activity:activities (
          experience_id,
          date,
          start_time,
          end_time,
          price_usd
        )
      `
      )
      .eq('id', id)
      .single();

    if (fetchError || !reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    if (reservation.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'Payment already confirmed' },
        { status: 400 }
      );
    }

    // Mock payment processing (in real app, validate payment provider webhook)
    const paymentSuccess = true; // Simulate successful payment

    if (paymentSuccess) {
      // Update reservation status
      const { error: updateError } = await supabase
        .from('reservations')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating reservation:', updateError);
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }

      // Send confirmation email
      try {
        await sendConfirmationEmail(reservation);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the request if email fails
        // The reservation is still confirmed
      }

      return NextResponse.json({
        success: true,
        message: 'Payment confirmed. Confirmation email sent.',
        confirmationCode: reservation.confirmation_code,
      });
    } else {
      return NextResponse.json({ error: 'Payment failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
