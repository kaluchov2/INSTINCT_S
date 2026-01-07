import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const reservationSchema = z.object({
  activityId: z.string().uuid(),
  customerName: z.string().min(2).max(255),
  customerEmail: z.string().email(),
  phone: z.string().optional(),
  participants: z.number().int().min(1).max(10),
  additionalInfo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = reservationSchema.parse(body);

    const supabase = await createClient();

    // Call the database function to safely create reservation
    const { data, error } = await supabase.rpc('reserve_activity_slot', {
      p_activity_id: validated.activityId,
      p_customer_name: validated.customerName,
      p_customer_email: validated.customerEmail,
      p_phone: validated.phone || null,
      p_participants: validated.participants,
      p_additional_info: validated.additionalInfo || null,
    });

    if (error) {
      console.error('Error calling reserve_activity_slot:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = data[0];

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      reservationId: result.reservation_id,
      confirmationCode: result.confirmation_code,
      message: 'Reservation created successfully. Please proceed to payment.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
